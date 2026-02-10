// utils/description.ts
export const parseDescription = (raw?: string): string[] => {
  if (!raw) return [];

  return raw
    .split("#")
    .map((item) => item.replace(/\r?\n/g, "").trim())
    .filter(Boolean);
};
