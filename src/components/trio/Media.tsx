import { media, type MediaKey } from "@/data/media";
import { cn } from "@/lib/utils";

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
 */
export function Media({ name, alt, sizes, className, priority = false }: Props) {
  const m = media[name];
  return (
    <img
      src={m.src}
      srcSet={m.srcSet}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(priority ? ({ fetchpriority: "high" } as any) : {})}
      className={cn("block h-full w-full object-cover", className)}
    />
  );
}