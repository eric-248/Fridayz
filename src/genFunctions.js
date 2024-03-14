export function areDatesEqual(date1, date2) {
  // Extract year, month, and day components from both dates
  const year1 = date1.getUTCFullYear();
  const month1 = date1.getUTCMonth();
  const day1 = date1.getUTCDate();

  const year2 = date2.getUTCFullYear();
  const month2 = date2.getUTCMonth();
  const day2 = date2.getUTCDate();

  // Return true if all components are equal
  return year1 === year2 && month1 === month2; //&& day1 === day2;
}
