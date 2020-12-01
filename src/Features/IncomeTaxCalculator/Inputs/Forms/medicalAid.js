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
import { Container } from '@material-ui/core' ;

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
      textAlign: 'left',
      flexShrink: 0,
      margin: theme.spacing(0, 0, 0, 1),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    input: {
      margin: theme.spacing(1, 2, 0, 0),
      width: '100%'
      
    },
    monthContainer: {
      display: "flex",
      flexDirection: "row",
      width: '100%',
      margin: theme.spacing(1, 0, 0, 0),
    },
    TextField: {
      margin: theme.spacing(1, 0, 1, 0),
    }
  }));

const months = [
    [
      {
        index: 0,
        title: "March",
        name: "march"
      },
      {
        index: 1,
        title: "April",
        name: "april"
      }
    ],
    [
      {
        index: 2,
        title: "May",
        name: "may"
      },
      {
        index: 3,
        title: "June",
        name: "june"
      }
    ],
    [
      {
        index: 4,
        title: "July",
        name: "july"
      },
      {
        index: 5,
        title: "August",
        name: "august"
      }
    ],
    [
      {
        index: 6,
        title: "September",
        name: "september"
      },
      {
        index: 7,
        title: "October",
        name: "october"
      }
    ],
    [
      {
        index: 8,
        title: "November",
        name: "november"
      },
      {
        index: 9,
        title: "December",
        name: "december"
      }
    ],
    [
      {
        index: 10,
        title: "January",
        name: "january"
      },
      {
        index: 11,
        title: "February",
        name: "february"
      }
    ]
  ]

const MedicalAidForm = (props) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log('props seq: ' + props.seq)
  console.log({props})
  
  let seq = props.seq
  console.log('props.reduxInputs[props.name][props.seq].id: ' + props.reduxInputs[props.name][props.seq].id)

  return (       
    
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Icon color="action" onClick={(event: any, newValue: string | null) => {
              props.onElementRemoved(props.name, props.reduxInputs[props.name][props.seq].id)
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
          defaultValue={""}
          style={{ width: 400 }}
          onChange={(event: any, newValue: string | null) => {
            props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'name', event.target.value)
          }}
          type="string"
        />

        <TextField
          id="outlined-basic"
          className={classes.TextField}
          label="Total Contributions"
          variant="outlined"
          defaultValue={0}
          style={{ width: 400 }}
          onChange={(event: any, newValue: string | null) => {
            props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'totalContributions', event.target.value)
          }}
          type="number"
          InputProps={{
          startAdornment: <InputAdornment position="start">R</InputAdornment>
          }}
        /> 

        <TextField
          id="outlined-basic"
          className={classes.TextField}
          label="Additional Expenses"
          variant="outlined"
          defaultValue={0}
          style={{ width: 400 }}
          onChange={(event: any, newValue: string | null) => {
            props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'additionalExpenses', event.target.value)
          }}
          type="number"
          InputProps={{
          startAdornment: <InputAdornment position="start">R</InputAdornment>
          }}
        />

        <FormControlLabel
          key={'fixedDependents'}
          className={classes.TextField}
          control={
            <Switch
              checked={props.inputs[0].fixedDependents || false}
              onChange={(event: any, newValue: string | null) => {
                //handleSetStateValue(config.stateName, newValue ? newValue : 0);
                //props.onElementToggled(config.stateName);
                props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'fixedDependents', (props.inputs[0].fixedDependents ? false : true));
                //console.log([Element.checked])
                //store.onElementToggled(config.stateName,Element.checked)
              }}
              name={'fixedDependents'}
              color="primary"
            />
          }
          label={'Fixed dependants for all 12 monthes?'}
        />

        {props.inputs[0].fixedDependents ? (
        <>
        <TextField
          id="outlined-basic"
          className={classes.TextField}
          label="Number of Dependents"
          variant="outlined"
          defaultValue={0}
          style={{ width: 400 }}
          onChange={(event: any, newValue: string | null) => {
            props.onElementUpdated(props.name, props.reduxInputs[props.name][props.seq].id, 'periodValue', event.target.value)
          }}
          type="number"
        />
        </>):<>
          {months.map(monthRow => {
            return (
              <Container className={classes.monthContainer}>
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label={monthRow[0].title}
                  variant="outlined"
                  name={monthRow[0].name}
                  defaultValue={0}
                  onChange={(event: any, newValue: string | null) => {
                    props.onElementMEDDEP(props.name, props.reduxInputs[props.name][props.seq].id, 'periodValues', monthRow[0].index, event.target.value)
                  }}
                  type="number"
                  
                />
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label={monthRow[1].title}
                  variant="outlined"
                  name={monthRow[1].name}
                  defaultValue={0}
                  onChange={(event: any, newValue: string | null) => {
                    props.onElementMEDDEP(props.name, props.reduxInputs[props.name][props.seq].id, 'periodValues', monthRow[1].index, event.target.value)
                  }}
                  type="number"
                  
                />
              </Container>
            )
          })}
        </>}
          
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
    onElementMEDDEP: (element, id, key, slot, value) => dispatch({ type: actionTypes.UPDATE_MEDDEP, element: element, id: id, key: key, slot: slot, value: value}),
    onNextStep: () => dispatch({ type: actionTypes.NEXT_STEP }),
    onPreviousStep: () => dispatch({ type: actionTypes.PREV_STEP }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalAidForm);









