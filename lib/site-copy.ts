// Warranty terms: 90 days on parts, 30 days on labor. Corrects older stored
// text on public pages, so the admin data itself is left untouched.
const WARRANTY_FIXES: Array<[RegExp, string]> = [
  [/backed by our 90-day warranty on parts and labor/g, "backed by our warranty: 90 days on parts and 30 days on labor"],
  [/We stand behind our parts and labor\./g, "90 days on parts and 30 days on labor."],
  [/^90-Day Warranty$/g, "Parts & Labor Warranty"],
  [/90-day warranty/g, "90-day parts and 30-day labor warranty"],
  [/We provide a free service call with completed repair\./g, "The service call fee is $85, or $51 when you book online. It is free with a completed repair."],
  // This stock photo shows Russian text and a uniform logo.
  [/photos\/34734504\/pexels-photo-34734504/g, "photos/31718639/pexels-photo-31718639"],
];

export function fixWarrantyCopy<T>(value: T): T {
  if (typeof value === "string") {
    return WARRANTY_FIXES.reduce<string>((text, [pattern, fixed]) => text.replace(pattern, fixed), value) as T;
  }
  if (Array.isArray(value)) return value.map(fixWarrantyCopy) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, fixWarrantyCopy(item)])) as T;
  }
  return value;
}
