export const fmtINR = (n: number): string =>
  "₹" + Math.round(n).toLocaleString("en-IN");
