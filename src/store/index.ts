import { getFeeAmount, getRateMarkedUp } from "../FX-Rates/utils";
import * as actionTypes from "./action-types";
import _ from 'lodash';

const createData = (
  pairName: string,
  originalRate: number,
  feePercentage: number
): PairTableItem => ({
  id: pairName,
  pairName: pairName,
  originalRate: originalRate,
  feePercentage: feePercentage,
  feeAmount: getFeeAmount(originalRate, feePercentage),
  rateFeeMarkup: getRateMarkedUp(originalRate, feePercentage),
});

const demoSymbols: Currency[] = [
  { symbol: "USD", label: "United States Dollar" },
  { symbol: "EUR", label: "Euro" },
  { symbol: "AED", label: "United Arab Emirates Dirham" },
  { symbol: "ARS", label: "Argentinian Peso" },
  { symbol: "GBP", label: "Great Britain Pound" },
];

const initialState: RootState = {
  symbolsList: demoSymbols,
  pairsList: [],
  pending: false,
  error: {
    ok: true,
    message: "",
  },
};

const parseSymbolsData = (symbols: { [key: string]: string }): Currency[] =>
  Object.entries(symbols).map(([symbol, label]) => ({
    symbol: symbol,
    label: label,
  }));

const reducer = (
  state: RootState = initialState,
  action: ReduxAction
): RootState => {
  switch (action.type) {
    case actionTypes.SYMBOL_LIST.PENDING:
    case actionTypes.GET_PAIR_DATA.PENDING:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.SYMBOL_LIST.REJECTED:
    case actionTypes.GET_PAIR_DATA.REJECTED:
      return {
        ...state,
        pending: false,
        error: {
          ok: false,
          message: action.payload,
        }
      };
    case actionTypes.SYMBOL_LIST.FULFILLED:
      const rawData = action.payload.symbols
      const parsedSymbols = _.isEmpty(rawData) ? [] : parseSymbolsData(rawData);
      return {
        ...state,
        pending: false,
        symbolsList: parsedSymbols,
      };
    case actionTypes.GET_PAIR_DATA.FULFILLED:
      return {
        ...state,
        pending: false,
      };
    case actionTypes.PAIR_DATA.ADD:
      const { pairName, feePercentage, originalRate } =
        action.payload as PairData;
      const newPair = createData(pairName, originalRate, feePercentage);
      return {
        ...state,
        pairsList: [...state.pairsList, newPair],
      };
    case actionTypes.PAIR_DATA.DELETE:
      const deleteItems = action.payload as string[];
      return {
        ...state,
        pairsList: state.pairsList.filter(
          (item) => !deleteItems.includes(item.id)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
