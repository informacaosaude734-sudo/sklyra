type ClassValue = string | false | null | undefined;

/** Junta classes condicionais. */
export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}
