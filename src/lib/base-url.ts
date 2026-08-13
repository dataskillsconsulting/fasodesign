const baseUrl = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function withBaseUrl(path = "") {
  return `${baseUrl}${path.replace(/^\//, "")}`;
}

export function pathnameWithoutBase(pathname: string) {
  const normalizedBase = baseUrl.replace(/\/$/, "");
  if (normalizedBase && pathname.startsWith(normalizedBase)) {
    return pathname.slice(normalizedBase.length) || "/";
  }
  return pathname;
}
