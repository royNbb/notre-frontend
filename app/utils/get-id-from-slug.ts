export function getIdFromSlug(pattern: string) {
  const parts = pattern.split("-");
  const id = parseInt(parts[parts.length - 1], 10);
  return isNaN(id) ? null : id;
}
