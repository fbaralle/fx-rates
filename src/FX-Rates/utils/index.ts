export const getFeeAmount = (rate: number, fee: number): number => {
  return Number(((rate * fee) / 100).toFixed(4));
};

export const getRateMarkedUp = (rate: number, fee: number) => {
  return Number((rate * (1 + fee / 100)).toFixed(4));
};
