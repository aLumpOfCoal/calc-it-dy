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

import Paper from '@material-ui/core/Paper';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { useIncomeTaxCalculator } from "../IncomeTaxCalculatorContext";

import { ageCategoryAsArray } from "../../../Enumerations/AgeCategory";
import { earningCycleAsArray } from "../../../Enumerations/EarningCycle";
import { taxYearAsArray } from "../../../Enumerations/TaxYear";
import { returnTypeAsArray } from "../../../Enumerations/ReturnType";
import { earningCertAsArray } from "../../../Enumerations/EarningCert";
import { businessTradeAsArray } from "../../../Enumerations/BusinessTrade";
import { rentalPropertyAsArray } from "../../../Enumerations/RentalProperty";
import { interestCertAsArray } from "../../../Enumerations/InterestCert";
import { rAAsArray } from "../../../Enumerations/RetirementAnnuity";
import { medicalAidAsArray } from "../../../Enumerations/MedicalAid";


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

//const steps = ['Wizard', 'Details', 'Report'];

const buttonOptionConfig = [
  {
      stateName: "earningCert",
      label: "Earning Certificates?"
  },
  {
      stateName: "businessTrade",
      label: "Business Trade?"
  },
  {
      stateName: "rentalProperty",
      label: "Rental Properties?"
  },
  {
      stateName: "interestCert",
      label: "Interest Certificates?"
  },
  {
      stateName: "retirementAnnuities",
      label: "Retirement Annuity?"
  },
  {
      stateName: "medicalAid",
      label: "Medical Aid?"
  }
  ]

const Wizard = () => {
  
    const handleChange = (event) => {
       const name = event.target.name;
      setState({
         ...state,
        [name]: event.target.value,
       });
     };

  const classes = useStyles();

//#region Enumerations

  const returnType = useMemo(() => {
    return returnTypeAsArray();
  }, [])

  const ageOptions = useMemo(() => {
    return ageCategoryAsArray();
  }, [])

  const earningOptions = useMemo(() => {
    return earningCycleAsArray();
  }, [])

  const taxYearOptions = useMemo(() => {
    return taxYearAsArray();
  }, [])

  const opsVol = ['dog','cat','birb'];

//#endregion Enumerations

//#region State Management

  //use state provided for by IncomeTaxCalculator.Provider component
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
//#endregion Statement Management
  
  const handleSubmit = data => {
    console.log(state);
    //handleSetStateValue("resultsForm", calculateTax(itc.state).resultsForm);
  };

  return (
    <>

    <Paper className={classes.paper}>  
    <FormControl component="fieldset" className={classes.formControl}>

      <h2 className={classes.h3}>WIZARD</h2>  

      <Autocomplete
        className={classes.input}
        id="tax-year-selector"
        options={taxYearOptions}
        defaultValue={taxYearOptions[0]}
        getOptionLabel={(option) => option.title}
        style={{ width: 400 }}
        onChange={(event: any, newValue: string | null) => {
          handleSetStateValue("taxYear", newValue ? newValue.value : 0);
        }}
        renderInput={params => (
          <TextField {...params} label="Tax Year" variant="outlined" />
        )}
      />    

      <Autocomplete
        className={classes.input}
        id="age-category-selector"
        options={ageOptions}
        defaultValue={ageOptions[0]}
        getOptionLabel={(option) => option.title}
        style={{ width: 400 }}
        onChange={(event: any, newValue: string | null) => {
          handleSetStateValue("ageCat", newValue ? newValue.value : 0);
        }}
        renderInput={params => (
          <TextField {...params} label="Age Category" variant="outlined" />
        )}
      />

      { buttonOptionConfig.map(config => (
      <FormControlLabel
              key={config.stateName}
              control={
                <Switch
                  checked={state[config.stateName] || false}
                  onChange={(event: any, newValue: string | null) => {
                    handleSetStateValue(config.stateName, newValue ? newValue : 0);
                  }}
                  name={config.stateName}
                  color="primary"
                />
              }
              label={config.label}
            />
      ))}


      <Button className ={classes.button} onClick={handleSubmit} variant="contained">
          Calculate
      </Button>

    </FormControl >
    </Paper>

    </>
  );
};

export default Wizard;

