import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  index: number;
  count: number;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  label: string;
};

export function SliderControls({
  index,
  count,
  atStart,
  atEnd,
  onPrev,
  onNext,
  onDot,
  label,
}: Props) {
  return (
    <div className="mt-8 flex items-center justify-between gap-6">
      <div className="flex items-center gap-2" role="tablist" aria-label={`${label} slides`}>
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onDot(i)}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              i === index ? "w-9 bg-orange" : "w-4 bg-border hover:bg-input",
            )}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={atStart}
          aria-label={`Previous ${label.toLowerCase()}`}
          className="grid size-11 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange disabled:opacity-30 disabled:hover:border-input disabled:hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={atEnd}
          aria-label={`Next ${label.toLowerCase()}`}
          className="grid size-11 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange disabled:opacity-30 disabled:hover:border-input disabled:hover:text-foreground"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
