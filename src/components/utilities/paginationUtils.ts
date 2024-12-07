// paginationUtils.ts
export function paginate(
  array: any[],
  itemsPerPage: number,
  currentPage: number
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return array.slice(start, end);
}
