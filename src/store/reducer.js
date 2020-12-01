import * as actionTypes from './actions' ;
import { clone, cloneDeep } from 'lodash' ;

import EarningCertFactory from '../Features/IncomeTaxCalculator/Factory/EarningsCert' ;
import BusinessTradeFactory from '../Features/IncomeTaxCalculator/Factory/BusinessTrade' ;
import CapitalGainsFactory from '../Features/IncomeTaxCalculator/Factory/CapitalGains' ;
import InterestCertFactory from '../Features/IncomeTaxCalculator/Factory/InterestCert' ;
import MedicalAidFactory from '../Features/IncomeTaxCalculator/Factory/MedicalAid' ;
import RentalPropertyFactory from '../Features/IncomeTaxCalculator/Factory/RentalProperty' ;
import RetirementAnnuitiesFactory from '../Features/IncomeTaxCalculator/Factory/RetirementAnnuities' ;
import businessTrade from '../Features/IncomeTaxCalculator/Inputs/Forms/businessTrade';
import retirementAnnuities from '../Features/IncomeTaxCalculator/Inputs/Forms/retirementAnnuities';

const TAXTABLEVALUES = Object.freeze({
	SALARY_FLOOR: 1,
	SALARY_CEILING: 2,
	TAX_RATE: 3,
	BASE_TAX: 4,
  })

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
		earningCert: [],
		businessTrade: [],
		rentalProperty: [],
		interestCert: [],
		retirementAnnuities: [],
		medicalAid: [],
		capitalGains: [] 	
	},
	calculation : {
		tally : {
			earningCert: 0 ,
			businessTrade: 0 , 
			rentalProperty: 0 ,
			interestCert: 0,
			retirementAnnuities: 0,
			raDeductions: 0,
			medicalContributions: 0,
			medicalAdditional: 0,
			medicalDependents: [0,0,0,0,0,0,0,0,0,0,0,0],
			medicalCredits: 0,
			totalGross: 0,
			
		},
		deductions: {
			raDed: 0,
			interestRebate: 0,
			totalDeductions: 0,
		},
		taxes : {
			taxableIncome: 0,
			taxLiabilityPreRebates: 0,
			taxLiability: 0,
			pAYE : 0 ,
			uIF : 0,
			Bracket: 0,
		},
		rebates : {
			primary : 0 ,
			secondary : 0,
			tertiary : 0,
			medCred: 0,
			medAdd: 0,
			totalRebates: 0,
		}
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
	let blank = '';
	let index = '';
	const taxYears = require('../Data/TaxYearData.json'); 

	switch (action.type) {
		case actionTypes.SEL_STAT:
			return {
				...newState,
				statutory: {
					...newState.statutory,
					[action.key]: [action.value]
				}
			};
		case actionTypes.TOGL_ELEMENT:
			blank = '' ;
			if (newState.inputs[action.key].length === 0) {
				console.log("Factory Call - ",action.key);
				blank = Factory[action.key];
				console.log({blank})
				return {
					...newState,
					wizard: {
						...newState.wizard,
						[action.key]: (newState.wizard[action.key] ? false: true)
						},
					inputs: {
						...newState.inputs,
						[action.key]: newState.inputs[action.key].concat(blank)
					}
			 }} else {
				return {
					...newState,
					wizard: {
						...newState.wizard,
						[action.key]: (newState.wizard[action.key] ? false: true)
						}
					}
				};
		case actionTypes.ADD_ELEMENT:
			blank = '' ;
			//blank = Factory[action.key];
			console.log(action.key)
			switch (action.key) {
				case 'earningCert': blank = EarningCertFactory()
				break;
				
				case 'businessTrade': blank = BusinessTradeFactory()
				break;
				
				case 'rentalPropertly': blank = RentalPropertyFactory()
				break;
				
				case 'interestCert': blank = InterestCertFactory()
				break;
				
				case 'medicalAid': blank = MedicalAidFactory()
				break;
				
				case 'retirementAnnuities': blank = RetirementAnnuitiesFactory()
				break;
			
				case 'rentalProperty': blank = RentalPropertyFactory()
				break;
				
			}
			console.log({blank})
			return {
				...newState,
				inputs:{
					...newState.inputs,
					[action.key]: newState.inputs[action.key].concat(blank)
				}
			};
		case actionTypes.REMOVE_ELEMENT:
			console.log({action})	
			index = newState.inputs[action.element].findIndex((obj => obj.id == action.id));
			console.log({index});
			newState.inputs[action.element].splice(index,1)
			return {
					...newState
				};
		case actionTypes.UPDATE_ELEMENT:
			console.log({action});
			index = newState.inputs[action.element].findIndex((obj => obj.id == action.id));
			console.log({index});
			newState.inputs[action.element][index][action.key] = action.value ;
			return {
				...newState,
			};
		case actionTypes.UPDATE_MEDDEP: // A SEPERATE UPDATE FUNCTION FOR MEDICAL AID DEPENDENTS
			console.log({action});
			index = newState.inputs[action.element].findIndex((obj => obj.id == action.id));
			console.log({index});
			console.log('Med Dep: ' + action.slot);
			newState.inputs[action.element][index][action.key][action.slot] = action.value ;
			return {
				...newState,
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
		case actionTypes.CALCULATE:
			
			//#region Const

			let yearTable = taxYears[newState.statutory.taxYear];
			let calculation = {
					tally : {
						earningCert: 0 ,
						businessTrade: 0 , 
						rentalProperty: 0 ,
						interestCert: 0,
						retirementAnnuities: 0,
						raDeductions: 0,
						medicalContributions: 0,
						medicalAdditional: 0,
						medicalDependents: [0,0,0,0,0,0,0,0,0,0,0,0],
						medicalCredits: 0,
						totalGross: 0,
						
					},
					deductions: {
						raDed: 0,
						interestRebate: 0,
						totalDeductions: 0,
					},
					taxes : {
						taxableIncome: 0,
						taxLiabilityPreRebates: 0,
						taxLiability: 0,
						pAYE : 0 ,
						uIF : 0,
						Bracket: 0,
						effTaxRate: 0
					},
					rebates : {
						primary : 0 ,
						secondary : 0,
						tertiary : 0,
						medCred: 0,
						medAdd: 0,
						totalRebates: 0,
					}
				} ;

			//#endregion Const	

			//#region Tallies -> Tallying up total earnings

			if ( newState.wizard.earningCert === true) {
				let tally = 0;
				let paye = 0 ;
				let uif = 0 ;
				newState.inputs.earningCert.map(config => {
					config.netProfit = Number(config.taxableEarnings);
					tally = tally + Number(config.taxableEarnings);
					paye = paye + Number(config.pAYE);
					uif = uif + Number(config.uIF);
					// Add the travel allowance deduction logic (nested if statements)
					if (config.taSwitch === true) {
						if (config.logbook === true) {
							if (config.lbMajority === true) {
								tally = tally - (Number(config.travelAllowance) * 0.8) ;
								config.netProfit = config.netProfit - (Number(config.travelAllowance) * 0.8) ;
							} else {
								tally = tally - (Number(config.travelAllowance) * 0.2) ;
								config.netProfit = config.netProfit - (Number(config.travelAllowance) * 0.2)  ;
							}
						}
					}
				})
				calculation.tally.earningCert = tally ;
				calculation.taxes.pAYE = paye ;
				calculation.taxes.uIF = uif ;
			}

			if ( newState.wizard.businessTrade === true ) {
				let tally = 0;
				newState.inputs.businessTrade.map(config => {
					config.netProfit = Number(config.turnover) - Number(config.costOfSales) + Number(config.otherIncome) - Number(config.expenses) ;
					tally = tally + config.netProfit ;
				})
				calculation.tally.businessTrade = tally ;
			}

			if ( newState.wizard.rentalProperty === true ) {
				let tally = 0 ;
				newState.inputs.rentalProperty.map(config => {
					tally = tally + Number(config.turnover) - Number(config.expenses) ;
					config.netProfit = Number(config.turnover) - Number(config.expenses) ;
				})
				calculation.tally.rentalProperty = tally ;
			}

			if ( newState.wizard.interestCert === true ) {
				let tally = 0 ;
				newState.inputs.interestCert.map(config => {
					tally = tally + Number(config.interestValue) ;
				})
				calculation.tally.interestCert = tally ;
			}

			if ( newState.wizard.retirementAnnuities === true ) {
				let tally = 0 ;
				newState.inputs.retirementAnnuities.map(config => {
					tally = tally + Number(config.totalContributions) ;
				})
				calculation.tally.retirementAnnuities = tally ;
			}

			if ( newState.wizard.medicalAid === true ) {
				let tally = 0 ;
				let additionalExpenses = 0 ;
				newState.inputs.medicalAid.map(config => {
					tally = tally + Number(config.totalContributions) ;
					additionalExpenses = additionalExpenses + Number(config.additionalExpenses) ;
					// Still need to record the number of dependents
					if ( config.fixedDependents === true ) {
						calculation.tally.medicalDependents.fill(config.periodValue);
						//calculation.tally.medicalDependents.foreach(config2 => config.periodValue)
					} else {
						calculation.tally.medicalDependents = config.periodValues.slice() ;
						//console.log(config.periodValues)
					}
				})
				calculation.tally.medicalContributions = tally ;
				calculation.tally.medicaladditional = additionalExpenses ;
			}

			// Taxable Gross -> Should probably destructure this
			calculation.tally.totalGross = calculation.tally.earningCert + calculation.tally.businessTrade + calculation.tally.rentalProperty + calculation.tally.interestCert ;
			
			
			//#endregion Tallies

			//#region Taxable Income + Deductions -> Calculating Deductiosn and Taxable Income
		
				//#region RA Deduction -> Calculate and add the Retirement Annuity Deduction

		if ( newState.wizard.retirementAnnuities === true) {
			let maxContribution = 0 ;
			maxContribution = calculation.tally.totalGross * 0.275 ;
			if ( maxContribution > yearTable.ra.randCap) { 
				maxContribution = yearTable.ra.randCap;
			}
			calculation.tally.maxContribution = Number(maxContribution) ;
			if (calculation.tally.retirementAnnuities > maxContribution) {
				calculation.deductions.raDed = Number(maxContribution) ;
			} else {
				calculation.deductions.raDed = Number(calculation.tally.retirementAnnuities) ;
			}					
		}
				//#endregion RA Deduction 

				//#region Interest Rebate -> Calculate and add the interest Deduction

		if ( newState.wizard.interestCert === true ) {

			if ( Number(newState.statutory.ageCat) > 0 ) {
				if ( calculation.tally.interestCert > yearTable.interestCap.over65 ) {
					calculation.deductions.interestRebate = yearTable.interestCap.over65
				} else {
					calculation.deductions.interestRebate = calculation.tally.interestCert
				}
			} else {
				if ( calculation.tally.interestCert > yearTable.interestCap.under65 ) {
					calculation.deductions.interestRebate = yearTable.interestCap.under65
				} else {
					calculation.deductions.interestRebate = calculation.tally.interestCert
				}
			}
		}
				//#endregion Interest Rebate	
			
				//#region Total Deductions -> Tally Total Deductions -> RA + Med Credits and Additional + Interest Rebate
			
			calculation.deductions.totalDeductions = calculation.deductions.raDed + calculation.deductions.interestRebate ;
			calculation.taxes.taxableIncome = calculation.tally.totalGross - calculation.deductions.totalDeductions ;
			console.log("calculation.deductions.totalDeductions " + calculation.deductions.totalDeductions)
			console.log("calculation.taxes.taxableIncome " + calculation.taxes.taxableIncome)
			console.log({calculation})
			console.log({yearTable})
			//#endregion Total Deductions

			//#endregion Taxable Income + Deductions

			//#region Tax Bracket + Tax Liability

		/*const taxBracketRow = yearTable.taxtable.find(taxBracket => {
			return calculation.taxes.taxableIncome >= taxBracket[TAXTABLEVALUES.SALARY_FLOOR] && calculation.taxes.taxableIncome < taxBracket[TAXTABLEVALUES.SALARY_CEILING];
			//return calculation.taxes.taxableIncome >= taxBracket[TAXTABLEVALUES.SALARY_FLOOR] && calculation.taxes.taxableIncome < taxBracket[TAXTABLEVALUES.SALARY_CEILING];
		})*/
		let taxBracketRow = 0 ;
		yearTable.taxtable.map(taxBracket => {
			if ( calculation.taxes.taxableIncome >= taxBracket[1] && calculation.taxes.taxableIncome < taxBracket[2]) {
				taxBracketRow = taxBracket
			}
			
		})
		
		console.log("Tax Bracket Row: ", taxBracketRow);
		
			// Calculate Tax Liability

		calculation.taxes.taxLiabilityPreRebates = 0 ;
		//calculation.taxes.taxLiabilityPreRebates =  (calculation.taxes.taxableIncome - taxBracketRow[TAXTABLEVALUES.SALARY_FLOOR]+1) * taxBracketRow[TAXTABLEVALUES.TAX_RATE] ;
		calculation.taxes.taxLiabilityPreRebates =  (calculation.taxes.taxableIncome - taxBracketRow[1]+1) * taxBracketRow[3] ;
		calculation.taxes.taxLiabilityPreRebates = calculation.taxes.taxLiabilityPreRebates + taxBracketRow[TAXTABLEVALUES.BASE_TAX] ;
		calculation.taxes.taxBracket = taxBracketRow ;
		console.log("calculation.taxes.taxLiabilityPreRebates: ", calculation.taxes.taxLiabilityPreRebates);

			//#endregion Tax Bracket + Tax Liability
			
			//#region Rebates

				//#region Standard Rebates
			
			calculation.rebates.primary = yearTable.rebates.primary;

			if (newState.statutory.ageCat >= 1) {
				calculation.rebates.secondary = yearTable.rebates.secondary;
			}

			if (newState.statutory.ageCat > 1) {
				calculation.rebates.tertiary = yearTable.rebates.tertiary;
			}

				//#endregion Standard Rebates

				//#region Medical Credits + Additional Expenses Calculate and add the medical Aid Deduction

			let medicalCreditsAdditional = 0;

			if (newState.wizard.medicalAid === true) {

				var medicalAidCredits = calculation.tally.medicalDependents.reduce((total, value) => {
					let medSchemeCred = 0;
			
					if (calculation.tally.medicalDependents[value] <= 2) {
					medSchemeCred = medSchemeCred + (calculation.tally.medicalDependents[value] * yearTable.medcred.main);
					} else {
					medSchemeCred = medSchemeCred + (2 * yearTable.medcred.main);
					medSchemeCred = medSchemeCred + ((calculation.tally.medicalDependents[value] - 2) * yearTable.medcred.tertiary);
					}
			
					return total + medSchemeCred;
			
				}, 0);
			
				let medicalCreditsAdditional = 0;
			
				if (newState.statutory.ageCat === 0) {
				medicalCreditsAdditional = ((calculation.tally.medicalContributions - (medicalAidCredits * 4) + calculation.tally.medicalAdditional) - (calculation.tally.totalGross * 0.075)) / 4;
				} else {
				medicalCreditsAdditional = (calculation.tally.medicalContributions - (medicalAidCredits * 3) + calculation.tally.medicalAdditional) / 3;
				}
				console.log('Additional Medical Credits: ' + medicalCreditsAdditional)
				calculation.rebates.medCred = medicalAidCredits ;
				calculation.rebates.medAdd = medicalCreditsAdditional ;
			}
				//#endregion Medical Credits & Addtional Expenses

				//#region Including Rebates into Tax Liability

			calculation.rebates.totalRebates = calculation.rebates.primary + calculation.rebates.secondary + calculation.rebates.tertiary + calculation.rebates.medCred + calculation.rebates.medAdd ;
			calculation.taxes.taxLiability = calculation.taxes.taxLiabilityPreRebates -  calculation.rebates.totalRebates ;

			let tax = Number(calculation.taxes.taxLiability) ;
			let income = Number (calculation.taxes.taxableIncome) ;
			calculation.taxes.effTaxRate = ((tax / income) * 100).toFixed(2) ;

				//#endregion Including Rebates into Tax Liability


			//#endregion Rebates

			console.log({calculation})

			return {
				...newState,
				calculation,
				activeStep: 2
			};
		default:
			return state;
	}
};

let Factory = {
	earningCert: EarningCertFactory(),
	businessTrade: BusinessTradeFactory(),
	rentalPropertly: RentalPropertyFactory(),
	interestCert: InterestCertFactory(),
	medicalAid: MedicalAidFactory(),
	retirementAnnuities: RetirementAnnuitiesFactory(),
	rentalProperty: RentalPropertyFactory()
  }

export default reducer ;