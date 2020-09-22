
/**
 * @enum EARNINGCYCLE
 */
const EARNINGCYCLE = Object.freeze({
  Monthly: {
    value: 12,
    title: "Monthly",
  },
  BIMONTHLY: {
    value: 6,
    title: "Bi-Monthly"
  },
  QUARTERLY: {
    value: 4,
    title: "Quarterly"
  },
  BIANNUALLY: {
    value: 2,
    title: "Bi-Annually"
  },
  ANNUALLY: {
    value: 1,
    title: "Annually"
  }
})

export default EARNINGCYCLE;

/**
 * Returns the AGECATEGORY enumeration as an option array
 */
export const earningCycleAsArray = () => {
 
  const arry = Object.keys(EARNINGCYCLE).map(key => {
    return EARNINGCYCLE[key];
  })
  
  return arry;
}