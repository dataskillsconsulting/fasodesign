/** Formats the conventions used by Burkina Faso public-service interfaces. */
export function formatAmount(value: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("fr-BF", {
    style: "currency",
    currency: "XOF",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
    ...options,
  }).format(value).replace("XOF", "FCFA");
}

export function formatDate(value: Date | string | number, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("fr-BF", { dateStyle: "medium", ...options }).format(new Date(value));
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("226") ? digits.slice(3) : digits;
  return normalized.length === 8 ? `+226 ${normalized.slice(0, 2)} ${normalized.slice(2, 4)} ${normalized.slice(4, 6)} ${normalized.slice(6)}` : value;
}
