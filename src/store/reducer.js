import * as actionTypes from './actions' ;
import { clone, cloneDeep } from 'lodash' ;

const initialState = {
	activeStep: 0,
	statutory:{
		taxYear: "2021" ,
		taxType: "0" ,
		ageCat: 0 
	},
	wizard: {
		earningCert: false,
		businessTrade: false,
		rentalProperty: false,
		interestCert: false,
		retirementAnnuities: false,
		medicalAid: false,
		capitalGains: false 
	},
	inputs: {
		earningCert: [{},{}],
		businessTrade: [{},{}],
		rentalProperty: [],
		interestCert: [],
		retirementAnnuities: [],
		medicalAid: [],
		capitalGains: [] 	
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
};

const blankState = {
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
	}
};

const reducer = ( state = initialState, action ) => {
	let newState = cloneDeep(state);
	switch (action.type) {
		case actionTypes.SEL_STAT:
			return {
				...newState,
				statutory: {
					...newState.statutory,
					[action.key]: [action.value]
				}
			}
		case actionTypes.TOGL_ELEMENT:
			return {
				...newState,
				wizard: {
					...newState.wizard,
					[action.key]: (newState.wizard[action.key] ? false: true)
					}
			};
		case actionTypes.ADD_ELEMENT:
			return {
				// CHANGE UP THIS PROCESS
				...newState,
				inputs:{
					...newState.inputs,
					[action.key]: newState.inputs.concat(blankState.inputs[action.key])
				}
				//inputs: newState.inputs.concat(blankState.inputs[action.key])
			};
		case actionTypes.REMOVE_ELEMENT:
			return {
				newState,
				inputs: newState.inputs[action.key].splice(action.id,1)
				// inputs: newState.inputs[action.key].filter(result => result.id !== action.id)
			};
		case actionTypes.NEXT_STEP: // CONSIDER REPLACING WITH A SINGLE SET_STEP FUNCTION
			return {
				...newState,
				activeStep: newState.activeStep + 1
			};
		case actionTypes.PREV_STEP: // CONSIDER REPLACING WITH A SINGLE SET_STEP FUNCTION
			return {
				...state,
				activeStep: state.activeStep - 1
			};
		default:
			return state;
	}
};

export default reducer ;