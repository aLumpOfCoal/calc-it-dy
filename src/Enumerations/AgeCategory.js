
/**
 * @enum AGECATEGORY
 */
const AGECATEGORY = Object.freeze({
  UNDER65: {
    value: 0,
    title: "Under 65",
  },
  BETWEEN6575: {
    value: 1,
    title: "65 - 75"
  },
  OVER75: {
    value: 2,
    title: "Over 75"
  }
})

export default AGECATEGORY;

/**
 * Returns the AGECATEGORY enumeration as an option array
 */
export const ageCategoryAsArray = () => {
 
  const arry = Object.keys(AGECATEGORY).map(key => {
    return AGECATEGORY[key];
  })
  
  return arry;
}