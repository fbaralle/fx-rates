import { Dispatch } from "redux";
import { AxiosResponse } from "axios";
import { getSymbols, getPair } from "../FX-Rates/services/api";
import * as actionTypes from "../store/action-types";

const actionCreator = (status: string, payload?) => ({
  type: status,
  payload,
});

type StateDispatchActions =
  | [string | undefined, string, string | undefined]
  | [string];

interface StateActionArgs {
  actionTypes: StateDispatchActions;
  apiRequest: (...args: unknown[]) => Promise<any>;
  dispatch: Dispatch;
}

export const stateAction = async <T>({
  actionTypes,
  apiRequest,
  dispatch,
}: StateActionArgs): Promise<AxiosResponse<T>> => {
  const [pending, fulfilled, rejected] = actionTypes;

  if (pending) dispatch(actionCreator(pending));

  try {
    const {data, status} = await apiRequest();

    if (status === 200 && data?.success) {
      dispatch(actionCreator(fulfilled as string, data));
    }

    if (rejected && data && !data.success) dispatch(actionCreator(rejected, data?.error?.type));
    
    return {...data, status}

  } catch (error) {
    // add format error utility
    if (rejected) dispatch(actionCreator(rejected, error));

    return error;
  }
};

export const getSymbolsAction = () => async (dispatch: Dispatch) => {
  stateAction({
    actionTypes: [
      actionTypes.SYMBOL_LIST.PENDING,
      actionTypes.SYMBOL_LIST.FULFILLED,
      actionTypes.SYMBOL_LIST.REJECTED,
    ],
    apiRequest: () => getSymbols(),
    dispatch,
  });
};

export const getPairsAction = (pairData: Partial<PairData>) => async (dispatch: Dispatch) => {
  const pairDataFulfilled = await stateAction<PairDataApiResponse>({
    actionTypes: [
      actionTypes.GET_PAIR_DATA.PENDING,
      actionTypes.GET_PAIR_DATA.FULFILLED,
      actionTypes.GET_PAIR_DATA.REJECTED,
    ],
    apiRequest: () => getPair(pairData.base as string, pairData.pair as string),
    dispatch,
  });

  if (pairDataFulfilled) {
    dispatch(actionCreator(actionTypes.PAIR_DATA.ADD, {...pairDataFulfilled, ...pairData}))
  }
};
