
/**
 * @enum RETURNTYPE
 */
const RETURNTYPE = Object.freeze({
  Income: {
    value: "0",
    title: "Income Tax",
  },
  Provisional: {
    value: "1",
    title: "Provisional Tax",
  }
})

export default RETURNTYPE;

/**
 * Returns the RETURN TYPE enumeration as an option array
 */
export const returnTypeAsArray = () => {
 
  const arry = Object.keys(RETURNTYPE).map(key => {
    return RETURNTYPE[key];
  })
  
  return arry;
}