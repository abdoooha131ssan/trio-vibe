// src/lib/assets.ts
// Centralized asset resolver for Lovable preview CDN paths (/__l5e/).
// It converts local Lovable-style paths such as "/__l5e/assets-v1/..." into a full origin URL
// using the environment variable VITE_LOVABLE_ASSET_ORIGIN when set.
// Default fallback is https://trio-vibe.lovable.app

export function getLovableOrigin(): string {
  const origin = (
    import.meta.env["VITE_LOVABLE_ASSET_ORIGIN"] || "https://trio-vibe.lovable.app"
  ).replace(/\/+$/, "");
  return origin;
}

export function resolveUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  // If url already absolute, return as-is
  if (/^https?:\/\//i.test(url)) return url;
  // If starts with Lovable local prefix, rewrite to origin + path
  if (url.startsWith('/__l5e/')) {
    return `${getLovableOrigin()}${url}`;
  }
  return url;
}

export function resolveSrcSet(srcSet: string | undefined): string | undefined {
  if (!srcSet) return srcSet;
  return srcSet
    .split(',')
    .map((token) => {
      const t = token.trim();
      if (!t) return t;
      const lastSpace = t.lastIndexOf(' ');
      let urlPart = t;
      let descriptor = '';
      if (lastSpace !== -1) {
        urlPart = t.slice(0, lastSpace);
        descriptor = t.slice(lastSpace + 1);
      }
      const resolved = resolveUrl(urlPart) ?? urlPart;
      return descriptor ? `${resolved} ${descriptor}` : `${resolved}`;
    })
    .join(', ');
}
