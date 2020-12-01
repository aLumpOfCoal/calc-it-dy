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

import InputFields from '../../../Enumerations/InputFields';

import { ageCategoryAsArray } from "../../../Enumerations/AgeCategory";
import { earningCycleAsArray } from "../../../Enumerations/EarningCycle";
import { taxYearAsArray } from "../../../Enumerations/TaxYear";
import { returnTypeAsArray } from "../../../Enumerations/ReturnType";
import buttonOptionConfig from "../../../Enumerations/InputFields";

import * as actionTypes from '../../../store/actions' ;
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0, 3, 3, 3),
    display: 'flex',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
    width: '400px'
  },
  input: {
    margin: theme.spacing(1, 1, 1, 0),
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
  h3: {
    color: 'grey',
    letterSpacing: '3px',
    margin: theme.spacing(1, 0, 0, 0),
  },
  reportBucket: {
    textAlign: 'left',
    margin: theme.spacing(1, 0, 0, 0),
  },
  reportTitle: {
    margin: theme.spacing(0, 0, 0, 0),
  },
  splitBucket: {
    display: 'flex',
    flexDirection : 'row',
    textAlign: 'left',
    margin: theme.spacing(0, 0, 0, 0),
    border: theme.spacing(0, 0, 0, 0),
  },
  leftBucket: {
    width: '50%',
    textAlign: 'left',
    margin: theme.spacing(0, 0, 0, 0),
  },
  rightBucket: {
    width: '50%',
    textAlign: 'right',
    margin: theme.spacing(0, 0, 0, 0),
  },
  topBucket: {
    margin: theme.spacing(1, 0, 0, 0),
  }
 

}));


const Wizard = props => {

  const classes = useStyles();
  
  const returnType = useMemo(() => {
    return returnTypeAsArray();
  }, [])

  const ageOptions = useMemo(() => {
    return ageCategoryAsArray();
  }, [])

  console.log(props.reduxWizard)

  return (
    <>

      <Paper className={classes.paper}>
        <FormControl component="fieldset" className={classes.formControl}>

          <h2 className={classes.h3}>REPORT</h2>

          <div className={classes.reportBucket}>
					  <h4 className={classes.reportTitle}>Return Details</h4>
            
              <div className={classes.splitBucket}>
                <div className={classes.leftBucket}>  
                  Tax Year: <br/>
                  Age Category: <br/>
                  Tax Type: <br/>
                </div>
                <div className={classes.rightBucket}>
                  {props.reduxState.statutory.taxYear} <br/>
                  {ageOptions[props.reduxState.statutory.ageCat].title} <br/>
                  {returnType[props.reduxState.statutory.taxType].title} <br/>
                </div>  
              </div>
            
          </div>

          <br/>

          <div className={classes.reportBucket}>
					  <h4 className={classes.reportTitle}>Details</h4>
            
              {InputFields.map(config => {
                let seq = 0
                return props.reduxState.wizard[config.stateName] === true ? (
                  <>                    
                    {props.reduxState.inputs[config.stateName].map(config2 => {
                      seq++
                      switch (config.stateName) {
                          case 'earningCert': 
                            return (
                              <div className={classes.topBucket}>
                                <b>{config.label} #{seq}:</b> {config2.name} 
                                <div className={classes.splitBucket}>
                                  <div className={classes.leftBucket}>  
                                    Taxable Earnings: <br/>
                                    Percentage of Total Income: <br/>
                                    PAYE Deducted:
                                    UIF Deducted:
                                  </div>
                                  <div className={classes.rightBucket}>
                                    {(config2.netProfit).toFixed(2)} <br/>
                                    {(config2.netProfit / props.reduxState.calculation.tally.totalGross * 100).toFixed(2)} % <br/>
                                    {(config2.pAYE)} <br/>
                                    {(config2.uIF)}
                                  </div>  
                                </div>
                              </div>
                            )
                          case 'businessTrade': 
                            return (
                              <div className={classes.topBucket}>
                                <b>{config.label} #{seq}:</b>  {config2.name}
                                <div className={classes.splitBucket}>
                                  <div className={classes.leftBucket}>  
                                    Taxable Earnings: <br/>
                                    Percentage of Total Income: <br/>
                                  </div>
                                  <div className={classes.rightBucket}>
                                    {(config2.netProfit).toFixed(2)} <br/>
                                    {(config2.netProfit / props.reduxState.calculation.tally.totalGross * 100).toFixed(2)} %
                                  </div>  
                                </div>
                              </div>
                            )
                          case 'rentalProperty': 
                            return (
                              <div className={classes.topBucket}>
                                <b>{config.label} #{seq}:</b> {config2.name} 
                                <div className={classes.splitBucket}>
                                  <div className={classes.leftBucket}>  
                                    Taxable Earnings: <br/>
                                    Percentage of Total Income: <br/>
                                  </div>
                                  <div className={classes.rightBucket}>
                                    {(config2.netProfit).toFixed(2)} <br/>
                                    {(config2.netProfit / props.reduxState.calculation.tally.totalGross * 100).toFixed(2)} %
                                  </div>  
                                </div>
                              </div>
                            )
                          case 'interestCert': 
                            return (
                              <div className={classes.topBucket}>
                                <b>{config.label} #{seq}:</b> {config2.name} 
                                <div className={classes.splitBucket}>
                                  <div className={classes.leftBucket}>  
                                    Interest Earned: <br/>
                                    Percentage of Total Income: <br/>
                                    Taxable Portion: <br/>
                                  </div>
                                  <div className={classes.rightBucket}>
                                    {(Number(config2.interestValue)).toFixed(2)} <br/>
                                    {(config2.interestValue / props.reduxState.calculation.tally.totalGross * 100).toFixed(2)} % <br/>
                                    {((config2.interestValue / props.reduxState.calculation.tally.interestCert * (props.reduxState.calculation.tally.interestCert - props.reduxState.calculation.deductions.interestRebate))).toFixed(2)}
                                  </div>  
                                </div>
                              </div>
                            )
                          case 'medicalAid': 
                            return (
                              <div className={classes.topBucket}>
                                <b>{config.label} #{seq}:</b> {config2.name} 
                                <div className={classes.splitBucket}>
                                  <div className={classes.leftBucket}>  
                                    Total Contributions: <br/>
                                    Additional Expenses: <br/>
                                  </div>
                                  <div className={classes.rightBucket}>
                                    {(Number(config2.totalContributions)).toFixed(2)} <br/>
                                    {(Number(config2.additionalExpenses)).toFixed(2)}
                                  </div>  
                                </div>
                              </div>
                            )
                          case 'retirementAnnuities': 
                            return (
                              <div className={classes.topBucket}>
                                <b>{config.label} #{seq}:</b> {config2.name} 
                                <div className={classes.splitBucket}>
                                  <div className={classes.leftBucket}>  
                                    Total Contributions: <br/>
                                    Tax Savings Created: <br/>
                                  </div>
                                  <div className={classes.rightBucket}>
                                    {(Number(config2.totalContributions)).toFixed(2)} <br/>
                                    {(config2.totalContributions / props.reduxState.calculation.tally.retirementAnnuities * props.reduxState.calculation.deductions.raDed).toFixed(2)}
                                  </div>  
                                </div>
                              </div>
                            )
                          default:
                            return null
                      }
                    })}
                  </>
                ) : null
              })}

          </div>
          
          <div className={classes.reportBucket}>
            <h4 className={classes.reportTitle}>Deductions & Rebtates</h4>
            <div className={classes.splitBucket}>
                <div className={classes.leftBucket}>  
                  {props.reduxState.calculation.rebates.primary  ? ( <>Primary Rebate: <br/></> ) : null}
                  {props.reduxState.calculation.rebates.secondary  ? ( <>Secondary Rebate: <br/></> ) : null}
                  {props.reduxState.calculation.rebates.tertiary  ? ( <>Tertiary Rebate: <br/></> ) : null}
                  {props.reduxState.calculation.rebates.medCred  ? ( <>Medical Credits: <br/></> ) : null}
                  {props.reduxState.calculation.rebates.medAdd  ? ( <>Additional Medical: <br/></> ) : null}
                  {props.reduxState.calculation.deductions.raDed  ? ( <>RA Deductions: <br/></> ) : null}
                  {props.reduxState.calculation.deductions.interestRebate  ? ( <>Interest Rebate: <br/></> ) : null}
                </div>
                <div className={classes.rightBucket}>
                  {props.reduxState.calculation.rebates.primary  ? ( <>{(Number(props.reduxState.calculation.rebates.primary)).toFixed(2)} <br/></> ) : null}
                  {props.reduxState.calculation.rebates.secondary  ? ( <>{(Number(props.reduxState.calculation.rebates.secondary)).toFixed(2)} <br/></> ) : null}
                  {props.reduxState.calculation.rebates.tertiary  ? ( <>{(Number(props.reduxState.calculation.rebates.tertiary)).toFixed(2)} <br/></> ) : null}
                  {props.reduxState.calculation.rebates.medCred  ? ( <>{(Number(props.reduxState.calculation.rebates.medCred)).toFixed(2)} <br/></> ) : null}
                  {props.reduxState.calculation.rebates.medAdd  ? ( <>{(Number(props.reduxState.calculation.rebates.medAdd)).toFixed(2)} <br/></> ) : null}
                  {props.reduxState.calculation.rebates.raDed !== 0 ? ( <>{(Number(props.reduxState.calculation.deductions.raDed)).toFixed(2)} <br/></> ) : null}
                  {props.reduxState.calculation.rebates.interestRebate !== 0 ? ( <>{(Number(props.reduxState.calculation.deductions.interestRebate)).toFixed(2)} <br/></> ) : null}
                </div>  
            </div>
          </div>

          <br/>

          <div className={classes.reportBucket}>
					  <h4 className={classes.reportTitle}>Summary</h4>
            
              <div className={classes.splitBucket}>
                <div className={classes.leftBucket}>  
                  Taxable Income: <br/>
                  Tax Liability: <br/>
                  Bracket Classification: <br/>
                  Average Tax Rate: <br/>
                  Pay As You Earn deducted: <br/>
                  Amount Payable: <br/>
                </div>
                <div className={classes.rightBucket}>
                  {(props.reduxState.calculation.taxes.taxableIncome).toFixed(2)} <br/>
                  {(props.reduxState.calculation.taxes.taxLiability).toFixed(2)} <br/>
                  {(props.reduxState.calculation.taxes.taxBracket[3]*100)} % <br/>
                  {props.reduxState.calculation.taxes.effTaxRate} % <br/>
                  {(props.reduxState.calculation.taxes.pAYE).toFixed(2)} <br/>
                  {(props.reduxState.calculation.taxes.taxLiability - props.reduxState.calculation.taxes.pAYE).toFixed(2)} <br/>
                </div>  
              </div>
            
          </div>

        </FormControl >
      </Paper>

    </>
  );
};

//
//
//Average Tax Rate: {props.reduxState.calculation.taxes.taxLiability / props.reduxState.taxes.taxableIncome} <br/>

//export default Wizard;

const mapStateToProps = state => {
  console.log([state])
  return {
    reduxState: state
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onStatSel: (field, value) => dispatch({type: actionTypes.SEL_STAT, key: field, value: value}),
    onElementToggled : (fieldToggled) => dispatch({type: actionTypes.TOGL_ELEMENT, key: fieldToggled}) ,
    onElementAdded : (fieldAdded) => dispatch({type: actionTypes.ADD_ELEMENT, key: fieldAdded}) ,
    onElementRemoved : (fieldRemoved, id) => dispatch({type: actionTypes.REMOVE_ELEMENT, key: fieldRemoved, id: id}) ,
    onNextStep : () => dispatch({type: actionTypes.NEXT_STEP}) ,
    onPreviousStep : () => dispatch({type: actionTypes.PREV_STEP}) ,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
