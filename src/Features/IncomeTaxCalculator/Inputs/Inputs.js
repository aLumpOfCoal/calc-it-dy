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
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import { useIncomeTaxCalculator } from "../IncomeTaxCalculatorContext";

import InputFields from '../../../Enumerations/InputFields';

import * as actionTypes from '../../../store/actions';
import { connect } from 'react-redux';

import BusinessTradeForm from './Forms/businessTrade';
import CapitalGainsForm from './Forms/capitalGains';
import EarningCertForm from './Forms/earningCert';
import InterestCertForm from './Forms/interestCert';
import MedicalAidForm from './Forms/medicalAid';
import RentalPropertyForm from './Forms/rentalProperty';
import RetirementAnnuitiesForm from './Forms/retirementAnnuities';

import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0, 3, 3, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
    width: '210px'
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
    padding: theme.spacing(0, 2, 2, 2),
    outline: 0,
    margin: theme.spacing(1, 1, 2, 0),

  },
  h2: {
    color: 'grey',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: theme.spacing(0, 1, 0, 0),
  },
  subTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1.5, 1, 1.5, 0),
  },
  nav: {
    flexDirection: 'row'
  }
}));

const Inputs = props => {

  //#region State Controllers

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

  //#endregion State Controllers

  /*
  
    If the wizard state is true then
    add Header
    add Increase button
    add Accordion Component Header
  
    ---- 
  
    Close up the accordion if the state was true 
  
    ####
    CONDITIONAL RENDERING!
    Learn how and when to use the render function
    https://www.youtube.com/watch?v=ljWAvLqZ7Es
  */

  console.log(props.reduxWizard)
  let seq = 0 
  let tempObj = {}
  return (
    <Paper className={classes.paper}>
      

      <FormControl component="fieldset" className={classes.formControl}>
        {InputFields.map(config => {
          seq = -1
          return props.reduxWizard[config.stateName] === true ? (
            <>

              <div className={classes.subTitle}>
                <h2 className={classes.h2}>{config.label}</h2>
                <Icon color="primary" onClick={(event: any, newValue: string | null) => {
                  props.onElementAdded(config.stateName);
                }}>add_circle</Icon>
              </div>
              
              {props.reduxInputs[config.stateName].map(config2 => {
                const Comp = inputComponentConfig[config.stateName];
                seq++
                tempObj = {
                  title : [config.label],
                  name : [config.stateName],
                  seq: seq,
                  inputs: [config2]
                }
                return (<Comp{...tempObj} />)
              })}
              
            </>
          ) : null
        })}

      </FormControl>

      <div className={classes.nav}>
      <Button className={classes.button} onClick={props.onPreviousStep} variant="contained">
        Back
      </Button>
      
      <Button className={classes.button} onClick={props.onNextStep, props.onCalculate} variant="contained">
        Calculate
      </Button>
      </div>

    </Paper>
  )
}

//export default Inputs;


const inputComponentConfig = {
  earningCert: EarningCertForm,
  businessTrade: BusinessTradeForm,
  rentalProperty: RentalPropertyForm,
  interestCert: InterestCertForm,
  medicalAid: MedicalAidForm,
  retirementAnnuities: RetirementAnnuitiesForm,
  rentalPropertyForm: RentalPropertyForm
}


const mapStateToProps = state => {
  console.log([state])
  return {
    reduxWizard: state.wizard,
    reduxInputs: state.inputs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStatSel: (field, value) => dispatch({ type: actionTypes.SEL_STAT, key: field, value: value }),
    onElementToggled: (fieldToggled) => dispatch({ type: actionTypes.TOGL_ELEMENT, key: fieldToggled }),
    onElementAdded: (fieldAdded) => dispatch({ type: actionTypes.ADD_ELEMENT, key: fieldAdded }),
    onElementRemoved: (fieldRemoved, id) => dispatch({ type: actionTypes.REMOVE_ELEMENT, key: fieldRemoved, id: id }),
    onElementUpdated: (element, id, key, value) => dispatch({ type: actionTypes.UPDATE_ELEMENT, element: element, id: id, key: key, value: value}),
    onNextStep: () => dispatch({ type: actionTypes.NEXT_STEP }),
    onPreviousStep: () => dispatch({ type: actionTypes.PREV_STEP }),
    onCalculate: () => dispatch({type: actionTypes.CALCULATE})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Inputs);

{/* 

        <Paper className={classes.paper}>  
        <FormControl component="fieldset" className={classes.formControl}>
        
        <h2>Business Trade</h2>

        

        </FormControl>
        </Paper>

        <Paper className={classes.paper}>  
        <FormControl component="fieldset" className={classes.formControl}>
        
        <h2>Rental Income</h2>

        

        </FormControl>
        </Paper>

        <Paper className={classes.paper}>  
        <FormControl component="fieldset" className={classes.formControl}>
        
        <h2>Interest Certificate</h2>


        

*/}