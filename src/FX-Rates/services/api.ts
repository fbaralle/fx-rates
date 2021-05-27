import axios from "axios";

const BASE_URL = "http://data.fixer.io/api/";
const API_KEY = "824e753b9d8f1bf170e5adf80e7788e9";
const BASE_CURRENCY = "EUR";

const endpoints = {
  latest: "latest",
  symbols: "symbols",
};

const getData = <T>(endpoint: string, query?: string) => {
  const url = `${BASE_URL}${endpoint}?access_key=${API_KEY}${query || ""}`;
  return axios.get<T>(url);
};

export const getSymbols = async () => {
  const { data, status } = await getData<FixerApiResponse>(endpoints.symbols);
  return { data, status };
};

export const getPair = async (base: string, pair: string) => {
  const query = (base: string, pair: string[]) => `&base=${base}&symbols=${pair.join(',')}`;
  const convertRate = (base: number, pair: number): number => parseFloat(Number(pair/base).toFixed(5));
  const { data, status } = await getData<PairDataApiResponse>(endpoints.latest, query(BASE_CURRENCY, [base !== BASE_CURRENCY ? base : '', pair]));
  let originalRate: number = 1;
  if (status === 200 && data && data.success && data.rates) {
    const { rates } = data; 
    originalRate = base !== BASE_CURRENCY ? convertRate(rates[base], rates[pair]) : Number(rates[pair])
  }
  const pairData = { ...data, originalRate}
  return { data: pairData, status};
}

// export const getPairsData 