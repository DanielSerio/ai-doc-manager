/**
 * Inverts the sorting object for api consumption.
 */
export function invertSorting(sorting: Record<string, 'asc' | 'desc'>) {
  const asc = [];
  const desc = [];

  for (const [key, value] of Object.entries(sorting)) {
    if (value === 'asc') {
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
