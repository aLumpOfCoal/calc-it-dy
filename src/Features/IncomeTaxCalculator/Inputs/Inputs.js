import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import { useIncomeTaxCalculator } from "../IncomeTaxCalculatorContext";
import Paper from '@material-ui/core/Paper';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0,3,3,3),
      
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
      width: '400px'
    },
    input: {
      margin: theme.spacing(2, 1, 2, 0),
    },
  
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(0, 2, 2,2),
      outline: 0,
      margin: theme.spacing(1, 1, 2, 0),
      
    },
    h3: {
      color: 'grey',
      letterSpacing: '3px',
    }
  
  }));

const Inputs = () => {

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

    const classes = useStyles();

    const itc = useIncomeTaxCalculator();

    const [state, setState] = React.useState(itc.state["wizard"]);
  
    useEffect(() => {
      itc.setStateKeyValue("wizard", state);
    }, [state])
  
    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  
    const handleSetStateValue = (stateName, value) => {
      setState({ ...state, [stateName]: value });
      
    };
  
  
    const handleAUtocompleteOnChange = event => {
      console.log(event);
    };

    return (
        <>
        <Paper className={classes.paper}>  
        <FormControl component="fieldset" className={classes.formControl}>
      

        <h2>Earnings Certificate</h2>

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Source Name"
            variant="outlined"
            defaultValue={""}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="string"
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Gross Earnings"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Tax Deducted"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        </FormControl>
        </Paper>

        <Paper className={classes.paper}>  
        <FormControl component="fieldset" className={classes.formControl}>
        
        <h2>Business Trade</h2>

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Source Name"
            variant="outlined"
            defaultValue={""}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="string"
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Total Revenue"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Total Expenditure"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            disabled
            label="Taxable Profit / Loss"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        </FormControl>
        </Paper>

        <Paper className={classes.paper}>  
        <FormControl component="fieldset" className={classes.formControl}>
        
        <h2>Rental Income</h2>

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Source Name"
            variant="outlined"
            defaultValue={""}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="string"
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Total Revenue"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Total Expenditure"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            disabled
            label="Taxable Profit / Loss"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />

        </FormControl>
        </Paper>

        <Paper className={classes.paper}>  
        <FormControl component="fieldset" className={classes.formControl}>
        
        <h2>Interest Certificate</h2>

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Source Name"
            variant="outlined"
            defaultValue={""}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="string"
        />

        <TextField
            id="outlined-basic"
            className={classes.input}
            label="Total Interest Received"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
            handleSetStateValue("income", newValue ? newValue.value : event.target.value);
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
        />
        </FormControl>
        </Paper>
    </>
    )
}

export default Inputs;
