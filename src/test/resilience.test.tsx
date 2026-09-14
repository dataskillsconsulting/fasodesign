import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useIdempotentSubmission, usePersistentDraft } from "@/lib/use-resilient-request";

describe("résilience des démarches", () => {
  it("restaure, enregistre et efface un brouillon local", () => {
    localStorage.setItem("request-draft", JSON.stringify({ name: "Awa" }));
    const { result } = renderHook(() => usePersistentDraft("request-draft", { initialValue: { name: "" } }));

    expect(result.current.value).toEqual({ name: "Awa" });
    expect(result.current.status).toBe("restored");
    act(() => result.current.setValue({ name: "Mariam" }));
    act(() => result.current.save());
    expect(JSON.parse(localStorage.getItem("request-draft") ?? "")).toEqual({ name: "Mariam" });
    expect(result.current.status).toBe("saved");
    act(() => result.current.clear());
    expect(localStorage.getItem("request-draft")).toBeNull();
  });

  it("partage une clé idempotente et ignore les doubles soumissions", async () => {
    let resolve!: (value: { reference: string }) => void;
    const action = vi.fn(() => new Promise<{ reference: string }>((done) => { resolve = done; }));
    const { result } = renderHook(() => useIdempotentSubmission(action));
    const firstKey = result.current.idempotencyKey;

    let first: Promise<{ reference: string }> | undefined;
    let second: Promise<{ reference: string }> | undefined;
    act(() => {
      first = result.current.submit({ service: "nationalité" });
      second = result.current.submit({ service: "nationalité" });
    });
    expect(first).toBe(second);
    expect(action).toHaveBeenCalledOnce();
    expect(action).toHaveBeenCalledWith({ service: "nationalité" }, { idempotencyKey: firstKey });

    await act(async () => { resolve({ reference: "BF-1" }); await first; });
    expect(result.current.status).toBe("success");
    act(() => result.current.reset());
    expect(result.current.idempotencyKey).not.toBe(firstKey);
  });
});
