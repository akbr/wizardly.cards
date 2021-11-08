export const getBidsStatus = (bids: (number | null)[]) => !bids.includes(null);
export const getBidsDiff = (bids: (number | null)[], turn: number) =>
  bids.map((x) => (x === null ? 0 : x)).reduce((prev, curr) => prev + curr, 0) -
  turn;
