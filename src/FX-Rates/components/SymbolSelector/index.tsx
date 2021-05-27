import React, { useState } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  Button,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface SymbolSelectorProps {
  symbols: Currency[];
  onAddPair: (pair: Partial<PairData>, valid?: boolean) => void;
  pending: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "#EAECEE",
      margin: "auto",
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: 150,
    },
    button: {
      margin: "auto",
    },
  })
);

const SymbolSelector = (props: SymbolSelectorProps) => {
  const { symbols, onAddPair, pending } = props;
  const classes = useStyles();
  const [symbol1, setSymbol1] = useState<Currency | undefined>(undefined);
  const [symbol2, setSymbol2] = useState<Currency | undefined>(undefined);
  const [fee, setFee] = useState<any>((0).toFixed(3));

  const onAddPairSubmit = () => {
    const validInput = !!symbol1 && !!symbol2;
    onAddPair(
      {
        pairName: `${symbol1?.symbol}/${symbol2?.symbol}`,
        base: symbol1?.symbol,
        pair: symbol2?.symbol,
        feePercentage: fee,
      },
      validInput
    );
    if (validInput) {
      setSymbol1(undefined);
      setSymbol2(undefined);
      setFee(0);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#34495E",
        padding: 30,
        flexGrow: 1,
        marginBottom: 20,
        marginTop: 20,
      }}
    >
      <Paper className={classes.paper}>
        <Grid container spacing={1} alignContent="space-between">
          <Grid item sm={2}>
            <div>Symbol 1</div>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title={symbol1?.label || ""}
            >
              <Typography variant="h5" component="div">
                {symbol1?.symbol || ""}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item sm={2}>
            <div>Symbol 2</div>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title={symbol2?.label || ""}
            >
              <Typography variant="h5" component="div">
                {symbol2?.symbol || ""}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item sm={2}>
            <TextField
              label="Fee %"
              disabled={pending}
              type="number"
              inputMode="decimal"
              inputProps={{ step: 0.001 }}
              value={fee}
              onChange={(e) => {
                setFee(e.target.value);
              }}
              id="outlined-start-adornment"
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={2}>
            <Autocomplete
              id="combo-box-demo"
              options={symbols}
              disabled={pending}
              getOptionLabel={(option) => option.symbol}
              onChange={(e, val) => setSymbol1(val || undefined)}
              value={symbol1}
              renderInput={(params) => (
                <TextField {...params} label="Symbol 1" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item sm={2}>
            <Autocomplete
              id="combo-box-demo"
              options={symbols}
              disabled={pending}
              getOptionLabel={(option) => option.symbol}
              onChange={(e, val) => setSymbol2(val || undefined)}
              value={symbol2}
              renderInput={(params) => (
                <TextField {...params} label="Symbol 2" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              disabled={pending}
              className={classes.button}
              startIcon={pending ? <CircularProgress /> : <AddIcon />}
              onClick={onAddPairSubmit}
            >
              Add pair
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SymbolSelector;
