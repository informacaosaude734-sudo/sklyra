import { cn } from "@/lib/utils";
const logoSrc = "/sklyra-arrow.png";

interface SklyraLogoProps {
  alt?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
}

/** Uses the bundled logo file so the brand also works from an XAMPP dist deployment. */
export const SklyraLogo = ({
  alt = "Sklyra",
  className,
  imageClassName,
  width = 64,
  height = 64,
}: SklyraLogoProps) => (
  <span className={cn("relative inline-flex shrink-0 items-center justify-center glitch-logo", className)}>
    <img
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn("block h-full w-full object-contain", imageClassName)}
    />
    <img
      src={logoSrc}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      className="glitch-layer glitch-layer--red object-contain"
    />
    <img
      src={logoSrc}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      className="glitch-layer glitch-layer--cyan object-contain"
    />
  </span>
);
