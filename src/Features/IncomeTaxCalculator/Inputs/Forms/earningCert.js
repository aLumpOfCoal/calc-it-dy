import React, { useEffect, useMemo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
//import MuiAccordion from '@material-ui/core/Accordion';
//import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
//import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore' ;
import Typography from '@material-ui/core/Typography';


import * as actionTypes from '../../../../store/actions';
import { connect } from 'react-redux';

import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: "flex",
      flexDirection: "column",
      '&$expanded': {
        margin: 0,
      }
    },
    expanded: {
      '&$expanded': {
          margin: 0
       }
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '50%',
      flexShrink: 0,
      textAlign: 'left',
      margin: theme.spacing(0, 0, 0, 1),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    TextField: {
      margin: theme.spacing(1, 0, 1, 0),
    },
    delete: {
      right: '0px',
      float: 'right',
      justifyContent: "flex-end",
      margin: theme.spacing(0, 1, 0, 0)
    },
    summaryBucket: {
      width: '100%',
      alignContent: 'space-between'
    },
    MuiAccordionSummaryContent: {
      alignContent: 'space-between'
    }
  }));

const EarningCertForm = (props) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log({props})


  return (       
    
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
          <Icon color="action" onClick={(event: any, newValue: string | null) => {
              props.onElementRemoved(props.name, props.inputs[0].id)
            }}>remove_circle</Icon>
          <Typography className={classes.heading}>{[props.title]} #{[props.seq+1]}</Typography>
          
        
      </AccordionSummary>

      <AccordionDetails>
        <FormControl>
          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="Source Name"
            variant="outlined"
            defaultValue={[props.inputs.name]}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
              //handleSetStateValue("taxYear", newValue ? newValue.value : 0);
              console.log(event.target.value);
              props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'name', event.target.value)
            }}
            type="string"
          />
          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="Non-retirement Earnings"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: number | null) => {
              props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'taxableEarnings', event.target.value)
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
          />
          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="PAYE Deducted"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
              props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'pAYE', event.target.value)
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
          />
          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="UIF Deducted"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
              props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'uIF', event.target.value)
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
          />

          <FormControlLabel
            key={'taSwitch'}
            control={
              <Switch
                checked={props.inputs[0].taSwitch || false}
                onChange={(event: any, newValue: string | null) => {
                  //handleSetStateValue(config.stateName, newValue ? newValue : 0);
                  //props.onElementToggled(config.stateName);
                  props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'taSwitch', (props.inputs[0].taSwitch ? false : true));
                  //console.log([Element.checked])
                  //store.onElementToggled(config.stateName,Element.checked)
                }}
                name={'taSwitch'}
                color="primary"
              />
            }
            label={'travel allowance?'}
          />

        {props.inputs[0].taSwitch ? (
          <>
            <FormControlLabel
            key={'taSwitch'}
            control={
              <Switch
                checked={props.inputs[0].logbook || false}
                onChange={(event: any, newValue: string | null) => {
                  //handleSetStateValue(config.stateName, newValue ? newValue : 0);
                  //props.onElementToggled(config.stateName);
                  props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'logbook', (props.inputs[0].logbook ? false : true));
                  //console.log([Element.checked])
                  //store.onElementToggled(config.stateName,Element.checked)
                }}
                name={'logbook'}
                color="primary"
              />
            }
            label={'Do you keep a logbook?'}
          />
          <FormControlLabel
            key={'taSwitch'}
            control={
              <Switch
                checked={props.inputs[0].lbMajority || false}
                onChange={(event: any, newValue: string | null) => {
                  //handleSetStateValue(config.stateName, newValue ? newValue : 0);
                  //props.onElementToggled(config.stateName);
                  props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'lbMajority', (props.inputs[0].lbMajority ? false : true));
                  //console.log([Element.checked])
                  //store.onElementToggled(config.stateName,Element.checked)
                }}
                name={'lbMajority'}
                color="primary"
              />
            }
            label={'Is in excess of 80% travel for business?'}
          />
          <TextField
            id="outlined-basic"
            className={classes.TextField}
            label="Travel Allowance Value"
            variant="outlined"
            defaultValue={0}
            style={{ width: 400 }}
            onChange={(event: any, newValue: string | null) => {
              props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'travelAllowance', event.target.value)
            }}
            type="number"
            InputProps={{
            startAdornment: <InputAdornment position="start">R</InputAdornment>
            }}
          />
          </>

        ):null}

          
          
        </FormControl>
      </AccordionDetails>

    </Accordion>

  )
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
    onElementRemoved: (element, id) => dispatch({ type: actionTypes.REMOVE_ELEMENT, element: element, id: id }),
    onElementUpdated: (element, id, key, value) => dispatch({ type: actionTypes.UPDATE_ELEMENT, element: element, id: id, key: key, value: value}),
    onNextStep: () => dispatch({ type: actionTypes.NEXT_STEP }),
    onPreviousStep: () => dispatch({ type: actionTypes.PREV_STEP }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarningCertForm);

//export default EarningCertForm ;

/*
 <FormControl>
          <TextField
              id="outlined-basic"
              className={classes.TextField}
              label="Source Name"
              variant="outlined"
              defaultValue={[props.thing]}
              style={{ width: 400 }}
              onChange={(event: any, newValue: string | null) => {
              
              }}
              type="string"
          />
          <TextField
              id="outlined-basic"
              className={classes.TextField}
              label="Gross Earnings"
              variant="outlined"
              defaultValue={0}
              style={{ width: 400 }}
              onChange={(event: any, newValue: string | null) => {
              
              }}
              type="number"
              InputProps={{
              startAdornment: <InputAdornment position="start">R</InputAdornment>
              }}
          />
          <TextField
              id="outlined-basic"
              className={classes.TextField}
              label="Tax Deducted"
              variant="outlined"
              defaultValue={0}
              style={{ width: 400 }}
              onChange={(event: any, newValue: string | null) => {
              
              }}
              type="number"
              InputProps={{
              startAdornment: <InputAdornment position="start">R</InputAdornment>
              }}
          />
        </FormControl>
    */