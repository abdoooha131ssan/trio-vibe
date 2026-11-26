import { useSiteBlock } from "@/lib/site-content";
import { resolveSrcSet, resolveUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";

type Asset = { src?: string; srcSet?: string; width?: number; height?: number };

type Props = {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function Media({ name, alt, sizes, className, priority = false }: Props) {
  const assets = useSiteBlock<Record<string, Asset>>("site.media");
  const asset = assets[name];
  if (!asset?.src) return null;

  const src = resolveUrl(asset.src) ?? asset.src;
  const srcSet = resolveSrcSet(asset.srcSet);

  return (
    <img
      src={src}
      {...(srcSet ? { srcSet } : {})}
      sizes={sizes}
      width={asset.width ?? 1400}
      height={asset.height ?? 990}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? ({ fetchPriority: "high" } as const) : {})}
      className={cn("block h-full w-full object-cover", className)}
    />
  );
}