import { useCallback, useEffect, useRef, useState } from "react";

export type DraftStatus = "idle" | "restored" | "saved" | "unavailable";

type PersistentDraftOptions<T> = {
  initialValue: T;
  storage?: Storage;
  parse?: (value: string) => T;
  serialize?: (value: T) => string;
};

function getStorage(storage?: Storage) {
  if (storage) return storage;
  if (typeof window === "undefined") return undefined;
  return window.localStorage;
}

/** Persists a form draft locally without making the application depend on storage. */
export function usePersistentDraft<T>(key: string, options: PersistentDraftOptions<T>) {
  const { initialValue, parse = JSON.parse as (value: string) => T, serialize = JSON.stringify } = options;
  const storageRef = useRef(getStorage(options.storage));
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = storageRef.current?.getItem(key);
      return saved === null || saved === undefined ? initialValue : parse(saved);
    } catch {
      return initialValue;
    }
  });
  const [status, setStatus] = useState<DraftStatus>(() => {
    if (!storageRef.current) return "unavailable";
    try {
      return storageRef.current.getItem(key) === null ? "idle" : "restored";
    } catch {
      return "unavailable";
    }
  });

  const save = useCallback((nextValue = value) => {
    try {
      if (!storageRef.current) throw new Error("Storage unavailable");
      storageRef.current.setItem(key, serialize(nextValue));
      setStatus("saved");
      return true;
    } catch {
      setStatus("unavailable");
      return false;
    }
  }, [key, serialize, value]);

  const clear = useCallback(() => {
    try {
      storageRef.current?.removeItem(key);
      setStatus(storageRef.current ? "idle" : "unavailable");
    } catch {
      setStatus("unavailable");
    }
  }, [key]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== storageRef.current || event.newValue === null) return;
      try {
        setValue(parse(event.newValue));
        setStatus("restored");
      } catch {
        setStatus("unavailable");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, parse]);

  return { value, setValue, save, clear, status };
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type SubmissionAction<T, Result> = (value: T, context: { idempotencyKey: string }) => Promise<Result>;

/** Prevents concurrent submissions and sends a stable idempotency key to the backend. */
export function useIdempotentSubmission<T, Result>(action: SubmissionAction<T, Result>) {
  const actionRef = useRef(action);
  actionRef.current = action;
  const activeRequest = useRef<Promise<Result> | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState<unknown>();
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());

  const submit = useCallback((value: T) => {
    if (activeRequest.current) return activeRequest.current;
    setStatus("submitting");
    setError(undefined);
    const request = actionRef.current(value, { idempotencyKey })
      .then((result) => {
        setStatus("success");
        return result;
      })
      .catch((reason: unknown) => {
        setError(reason);
        setStatus("error");
        throw reason;
      })
      .finally(() => {
        activeRequest.current = null;
      });
    activeRequest.current = request;
    return request;
  }, [idempotencyKey]);

  const reset = useCallback(() => {
    if (activeRequest.current) return;
    setStatus("idle");
    setError(undefined);
    setIdempotencyKey(crypto.randomUUID());
  }, []);

  return { submit, reset, status, error, idempotencyKey, isSubmitting: status === "submitting" };
}
