import { media, type MediaKey } from "@/data/media";
import { cn } from "@/lib/utils";
import { resolveUrl, resolveSrcSet } from "@/lib/assets";

type Props = {
  name: MediaKey;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Responsive CDN image. Always renders intrinsic width/height so the browser
 * reserves space and the layout never shifts.
 *
 * Uses the centralized resolver to convert /__l5e/... paths into a full origin
 * (VITE_LOVABLE_ASSET_ORIGIN or fallback https://trio-vibe.lovable.app).
 */
export function Media({ name, alt, sizes, className, priority = false }: Props) {
  const m = media[name];

  const src = resolveUrl(m.src);
  const srcSet = resolveSrcSet(m.srcSet);

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? ({ fetchPriority: "high" } as const) : {})}
      className={cn("block h-full w-full object-cover", className)}
    />
  );
}

export type { MediaKey };
