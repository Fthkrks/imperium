export const SITE_DATA_TABLES = {
  "contact.json": "contact",
  "blog.json": "blog",
  "services-residential.json": "services_residential",
  "services-commercial.json": "services_commercial",
  "testimonials.json": "testimonials",
  "why.json": "why",
  "areas.json": "areas",
  "locations.json": "locations",
  "faq.json": "faq",
  "brands.json": "brands",
  "metadata.json": "metadata",
  "service-details.json": "service_details",
} as const;

export type AllowedFile = keyof typeof SITE_DATA_TABLES;
export type AllowedTable = (typeof SITE_DATA_TABLES)[AllowedFile];

export const ALLOWED_FILES = Object.keys(SITE_DATA_TABLES) as AllowedFile[];
export const ALLOWED_TABLES = Object.values(SITE_DATA_TABLES) as AllowedTable[];

const TABLE_TO_FILE = Object.fromEntries(
  Object.entries(SITE_DATA_TABLES).map(([file, table]) => [table, file]),
) as Record<AllowedTable, AllowedFile>;

export function isAllowedFile(file: string): file is AllowedFile {
  return file in SITE_DATA_TABLES;
}

export function getTableNameForFile(file: AllowedFile): string {
  return SITE_DATA_TABLES[file];
}

export function isAllowedTable(table: string): table is AllowedTable {
  return table in TABLE_TO_FILE;
}

export function getFileForTable(table: AllowedTable): AllowedFile {
  return TABLE_TO_FILE[table];
}
