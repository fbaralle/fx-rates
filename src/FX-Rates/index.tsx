import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import Table from "./components/Table";
import Alert from "./components/Alert";
import SymbolSelector from "./components/SymbolSelector";
import { connect } from "react-redux";
import { getSymbolsAction, getPairsAction } from "../store/actions";
import * as actionTypes from "../store/action-types";

const COLUMNS = [
  { id: "pair", label: "Pair", numeric: false, disablePadding: false },
  {
    id: "originalRate",
    disablePadding: false,
    label: "Original Rate",
    numeric: true,
  },
  {
    id: "feePercentage",
    label: "Fee %",
    disablePadding: false,
    numeric: true,
  },
  {
    id: "feeAmount",
    label: "Fee Amount",
    numeric: true,
    disablePadding: false,
  },
  {
    id: "rateFeeMarkup",
    label: "Rate with fee",
    numeric: true,
    disablePadding: false,
  },
];

interface FXRatesProps {
  pairsList: PairTableItem[];
  symbolsList: Currency[];
  deletePair: (pair: string[]) => void;
  pending: boolean;
  getSymbolsAction: () => Promise<void>;
  getPairsAction: (pairData: Partial<PairData>) => Promise<void>;
}

const FXRates = (props: FXRatesProps) => {
  const { pairsList, symbolsList, deletePair, pending, getPairsAction } = props;
  const [openAlert, setOpenAlert] = useState({open: false, message: ''});

  const onAddNewPair = (pair: Partial<PairData>, validation?: boolean) => {
    if (!validation) {
      setOpenAlert({open: true, message: 'Invalid input'});
      return;
    }
    const pairAlreadyExists = pairsList.some(
      (item) => item.pairName === pair.pairName
    );
    if (pairAlreadyExists) {
      setOpenAlert({open: true, message: 'Pair already exists'});
      return;
    }
    getPairsAction(pair)
    
  };

  useEffect(() => {
    getSymbolsAction();
  }, []);

  return (
    <React.Fragment>
      <Typography
        variant="h3"
        component="div"
        style={{ color: "white", marginBottom: 80 }}
      >
        FX Rates
      </Typography>
      <SymbolSelector
        symbols={symbolsList}
        onAddPair={(pair, val) => onAddNewPair(pair, val)}
        pending={pending}
      />
      <Table
        rows={pairsList}
        columns={COLUMNS}
        onDeletePair={(pair) => deletePair(pair)}
      />
      <Alert message={openAlert.message} openAlert={openAlert.open} setOpenAlert={open => setOpenAlert({...openAlert, open: open})}/>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  pairsList: state.pairsList,
  symbolsList: state.symbolsList,
  pending: state.pending,
});

const mapDispatchToProps = (dispatch) => ({
  getPairsAction: (pairData: Partial<PairData>) => dispatch(getPairsAction(pairData)),
  deletePair: (pairs: string[]) =>
    dispatch({ type: actionTypes.PAIR_DATA.DELETE, payload: pairs }),
  getSymbolsAction: () => dispatch(getSymbolsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FXRates);
