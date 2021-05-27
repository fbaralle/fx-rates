interface Currency {
  symbol: string;
  label: string;
}

// API

interface FixerApiResponse {
    success: boolean;
    error: {
      type: string;
      [key: string]: any;
    }
    [key: string]: any;
}

interface PairDataApiResponse extends FixerApiResponse {
  rates: {
    [key: string]: number;
  }
  originalRate: number;
}

// Store types
interface RootState {
  symbolsList: Currency[];
  pairsList: PairTableItem[];
  pending: boolean;
  error: {
    ok: boolean;
    message: string;
  }
}

interface PairData {
  pairName: string;
  base: string;
  pair: string;
  originalRate: number;
  feePercentage: number;
}

interface ReduxAction {
  type: string;
  payload?: any;
}

// Table types
interface PairTableItem {
  id: string;
  pairName: string;
  originalRate: number;
  feePercentage: number;
  feeAmount: number;
  rateFeeMarkup: number;
}

interface CustomTableProps {
  rows: PairTableItem[];
  columns: any;
  onDeletePair: (pair: string[]) => void;
}