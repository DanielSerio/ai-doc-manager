import type { SortingState } from "@tanstack/react-table";

/**
 * Inverts the sorting object for api consumption.
 */
export function invertSorting(sorting: SortingState) {
  const asc = [];
  const desc = [];

  for (const [key, value] of Object.entries(sorting)) {
    if (!value.desc) {
      asc.push(key);
    } else {
      desc.push(key);
    }
  }

  return {
    asc,
    desc
  };
}
