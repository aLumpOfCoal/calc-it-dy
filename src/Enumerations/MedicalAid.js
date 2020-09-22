
/**
 * @enum MEDICALAID
 */
const MEDICALAID = Object.freeze({
  ["0"]: {
    value: "0",
    title: "",
  },
  ["1"]: {
    value: "1",
    title: "Main Member",
  },
  ["2"]: {
    value: "2",
    title: "Main Member with 1 Dependent",
  },
  ["3"]: {
    value: "3",
    title: "Main Member with 2 Dependents",
  },
  ["4"]: {
    value: "4",
    title: "Main Member with 3 Dependents",
  },
  ["5"]: {
    value: "5",
    title: "Main Member with 4 Dependents",
  },
  ["6"]: {
    value: "6",
    title: "Main Member with 5 Dependents",
  },
  ["7"]: {
    value: "7",
    title: "Main Member with 6 Dependents",
  },
  ["8"]: {
    value: "8",
    title: "Main Member with 7 Dependents",
  },
  ["9"]: {
    value: "9",
    title: "Main Member with 8 Dependents",
  },
  ["10"]: {
    value: "10",
    title: "Main Member with 9 Dependents",
  }
})

export default MEDICALAID;

/**
 * Returns the MEDICALAID enumeration as an option array
 */
export const medicalAidAsArray = () => {
 
  const arry = Object.keys(MEDICALAID).map(key => {
    return MEDICALAID[key];
  })
  
  return arry;
}