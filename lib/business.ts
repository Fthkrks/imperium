export const BUSINESS = {
  name: "Imperium Appliance Repair",
  phone: "(346) 673-5111",
  phoneHref: "tel:+13466735111",
  email: "info@imperiumappliance.com",
} as const;

/** Builds a valid tel: link from any stored phone format ("tel:346...", "(346) 673-5111", ...). */
export function toTelHref(value: unknown): string {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return BUSINESS.phoneHref;
}

export function normalizeContact<T extends Record<string, unknown>>(raw: T | null | undefined) {
  const contact = (raw ?? {}) as Record<string, unknown>;
  return {
    ...contact,
    phone: (contact.phone as string) || BUSINESS.phone,
    phoneHref: toTelHref(contact.phoneHref || contact.phone),
    email: (contact.email as string) || BUSINESS.email,
  };
}
