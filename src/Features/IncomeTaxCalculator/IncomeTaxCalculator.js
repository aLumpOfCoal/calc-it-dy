import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Wizard from './Wizard/Wizard';
import Inputs from './Inputs/Inputs';
import IncomeTaxCalcContext from './IncomeTaxCalculatorContext';

import AGECATEGORY from '../../Enumerations/AgeCategory';
import EARNINGCYCLE from '../../Enumerations/EarningCycle';
import TAXYEAR from '../../Enumerations/TaxYear';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import * as actionTypes from '../../store/actions' ;
import { connect } from 'react-redux';
import { Provider } from 'react-redux' ;


const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    margin: "auto",
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  stepper: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3, 0),
  },
}));


//Move to panelProps later
const panelNames = {
  medical: "medical",
  retirement: "retirement",
  travel: "travel",
}

const ITCinitialState = {
  activeStep: 0,
  wizard: {
    taxYear: "" ,
    taxType: "" ,
    ageCat: "" ,
    earningCert: false,
    businessTrade: false,
    rentalProperty: false,
    interestCert: false,
    retirementAnnuities: false,
    medicalAid: false,
    capitalGains: false 
  },
  inputs: {
    earningsCerts: [{
      index : 0 ,
      name :"" ,
      taxableEarnings: "",
      pAYE: "",
      uIF: "",
      medical: "",
      rA: "",
      travelAllowance: "",
      logbook: false ,
      lbMajority: false ,
      taxLiability: ""
    }],
    businessTrades: [{
      index : 0 ,
      name: "" ,
      turnover: "" ,
      costOfSales: "" ,
      expenses: "" ,
      netProfit: "" ,
      taxLiability: "" 
    }],
    rentalProperties: [{
      index : 0 ,
      name: "" ,
      turnover: "" ,
      expenses: "" ,
      netProfit: "" ,
      taxLiability: "" 
    }],
    interestEarnings: [{
      index : 0 ,
      name: "" ,
      interestValue: "" ,
      taxLiability: "" 
    }],    
    retirementAnnuities: [{
      index : 0 ,
      name: "",
      totalContributions: "",
    }],
    medicalAid: [{
      index : 0 ,
      name: "" ,
      totalContributions: "",
      additionalExpenses: "",
      periodValues: ["", "", "", "", "", "", "", "", "", "", "", ""]
    }],
    capitalGains: [{
      index: 0,
      name: ""
    }]
  },
  calculation: {
    totalEarnings: 0,
    taxBracket: 0,
    taxLiability: 0,
    paye: 0,
    provisional: 0,
    deductions: 0,
    rebates: 0,
  },
  outputs:{
    taxableEarnings:[{
      index: 0,
      type: "",
      name: "",
      taxLiability: "",
      percentage: 0,
      retirementSavings: 0
    }],
    deductionSummary:[{
      index: 0,
      type: "",
      name: "",
      value: 0
    }],
    rebateSummary:[{
      index: 0,
      type: "",
      name: "",
      value: 0
    }]
  }
}

const steps = ['Wizard', 'Details', 'Report'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Wizard />;
    case 1:
      return <><Inputs /></>;
    case 2:
      return <>3</>;
    default:
      throw new Error('Unknown step');
  }
}

const IncomeTaxCalculator = (store) => {

  const classes = useStyles();

  const [state, setState] = useState(ITCinitialState)

  const setStateKeyValue = (key, value) => {
    setState(prevState => { return { ...prevState, [key]: value } })
  }

  //for debugging, logs form state
  useEffect(() => {
    console.log(state);
  }, [state])

  const calcContextState = {
    state: state,
    setStateKeyValue: setStateKeyValue
  }

  //let reduxStep = 1 ;
  console.log(store.reduxStep)
  

  return (
    <IncomeTaxCalcContext.Provider value={calcContextState}>
      <div className={classes.root}>

        

        <Stepper activeStep={store.reduxStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(store.reduxStep)}

        
        

      </div>
    </IncomeTaxCalcContext.Provider>
  )
}

const mapStateToProps = state => {
  console.log([state])
  return {
    reduxStep: state.activeStep
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onElementToggled : (fieldToggled, fieldValue) => dispatch({type: actionTypes.TOGL_ELEMENT, key: fieldToggled, value: fieldValue}) ,
    onElementAdded : (fieldAdded) => dispatch({type: actionTypes.ADD_ELEMENT, key: fieldAdded}) ,
    onElementRemoved : (fieldRemoved, id) => dispatch({type: actionTypes.REMOVE_ELEMENT, key: fieldRemoved, id: id}) ,
    onNextStep : () => dispatch({type: actionTypes.NEXT_STEP}) ,
    onPreviousStep : () => dispatch({type: actionTypes.PREV_STEP}) ,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeTaxCalculator);


/*
        <Accordion disabled={!state.formBuilder[panelNames.medical]}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${panelNames.retirement}_header`}
            id={`${panelNames.medical}_header`}
          >
            <Typography className={classes.heading}>MEDICAL AID</Typography>
            {!state.formBuilder[panelNames.medical] && <Typography className={classes.secondaryHeading}>No medical aid</Typography>}
          </AccordionSummary>
          <AccordionDetails>
            <MedicalAidForm>
            </MedicalAidForm>
          </AccordionDetails>
        </Accordion>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${panelNames.retirement}_content`}
            id={`${panelNames.retirement}_header`}
          >
            <Typography className={classes.heading}>RETIREMENT</Typography>
            {!state.formBuilder[panelNames.retirement] && <Typography className={classes.secondaryHeading}>No retirement</Typography>}
          </AccordionSummary>
          <AccordionDetails>
            {state.formBuilder[panelNames.retirement] ?
              <RetirementForm>
              </RetirementForm> :
              <Typography>
                You could be saving XX amount on tax if you had a retirement annuity. Go here (some affiliates, make dollar for referals)
          </Typography>}
          </AccordionDetails>
        </Accordion>
        <Accordion disabled={!state.formBuilder[panelNames.travel]}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${panelNames.travel}_content`}
            id={`${panelNames.travel}_header`}
          >
            <Typography className={classes.heading}>TRAVEL ALLOWANCE</Typography>
            {!state.formBuilder[panelNames.travel] && <Typography className={classes.secondaryHeading}>No travel allowance</Typography>}
          </AccordionSummary>
          <AccordionDetails>
            <TravelAllowanceForm></TravelAllowanceForm>
          </AccordionDetails>
        </Accordion>
        */