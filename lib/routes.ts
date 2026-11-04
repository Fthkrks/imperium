type ServiceRoute = { id: string; slug: string; name: string };

const RESIDENTIAL: Array<[string, string]> = [
  ["2", "Refrigerator"], ["3", "Washer"], ["4", "Ice Machine"], ["5", "Dryer"], ["6", "Dishwasher"],
  ["7", "Oven"], ["8", "Cooktop"], ["9", "Microwave"], ["10", "Wine Cooler"], ["11", "Freezer"],
  ["12", "Garbage Disposal"], ["13", "Stove"], ["14", "Range"],
];

const COMMERCIAL: Array<[string, string]> = [
  ["1", "Refrigerator"], ["15", "Washer"], ["16", "Ice Machine"], ["17", "Dryer"], ["18", "Dishwasher"],
  ["19", "Oven"], ["20", "Cooktop"], ["21", "Microwave"], ["22", "Wine Cooler"], ["23", "Freezer"],
  ["24", "Stove"], ["25", "Garbage Disposal"], ["26", "Vent Hood"], ["27", "Range"],
];

const toSlug = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

export const SERVICE_ROUTES: ServiceRoute[] = [
  ...RESIDENTIAL.map(([id, name]) => ({ id, name: `${name} Repair`, slug: `${toSlug(name)}-repair` })),
  ...COMMERCIAL.map(([id, name]) => ({
    id,
    name: `Commercial ${name} Repair`,
    slug: `commercial-${toSlug(name)}-repair`,
  })),
];

/** Old numeric brand URLs mapped to readable ones. Brand 9 duplicated the existing Viking page. */
export const BRAND_ROUTES: Record<string, string> = {
  bosch: "1",
  whirlpool: "2",
  kenmore: "3",
  maytag: "4",
  frigidaire: "5",
  electrolux: "6",
  miele: "7",
  samsung: "8",
};

/** These brand pages had another brand's logo stored, so they show the name as text. */
export const BRANDS_WITHOUT_LOGO = ["sub-zero", "thermador", "wolf", "monogram"];

export function findService(slug: string) {
  return SERVICE_ROUTES.find((route) => route.slug === slug);
}

/** Stored service links still use numeric ids; turn them into readable URLs. */
export function toServiceHref(href: unknown): string {
  const value = String(href ?? "");
  const id = value.match(/^\/services\/(\d+)$/)?.[1];
  const route = id ? SERVICE_ROUTES.find((item) => item.id === id) : undefined;
  return route ? `/services/${route.slug}` : value || "/services";
}

export function legacyRedirects() {
  return [
    ...SERVICE_ROUTES.map(({ id, slug }) => ({
      source: `/services/${id}`,
      destination: `/services/${slug}`,
      permanent: true,
    })),
    ...Object.entries(BRAND_ROUTES).map(([slug, id]) => ({
      source: `/brands/${id}`,
      destination: `/brands/${slug}`,
      permanent: true,
    })),
    { source: "/brands/9", destination: "/brands/viking", permanent: true },
    { source: "/home", destination: "/", permanent: true },
  ];
}
