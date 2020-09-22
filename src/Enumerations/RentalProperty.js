
/**
 * @enum RENTALPROPERTY
 */
const RENTALPROPERTY = Object.freeze({
  ["0"]: {
    value: "0",
    title: "",
  },
  ["1"]: {
    value: "1",
    title: "1 Property",
  },
  ["2"]: {
    value: "2",
    title: "2 Properties",
  },
  ["3"]: {
    value: "3",
    title: "3 Properties",
  },
  ["4"]: {
    value: "4",
    title: "4 Properties",
  },
  ["5"]: {
    value: "5",
    title: "5 Properties",
  },
  ["6"]: {
    value: "6",
    title: "6 Properties",
  },
  ["7"]: {
    value: "7",
    title: "7 Properties",
  },
  ["8"]: {
    value: "8",
    title: "8 Properties",
  },
  ["9"]: {
    value: "9",
    title: "9 Properties",
  },
  ["10"]: {
    value: "10",
    title: "10 Properties",
  }
})

export default RENTALPROPERTY;

/**
 * Returns the RENTALPROPERTY enumeration as an option array
 */
export const rentalPropertyAsArray = () => {
 
  const arry = Object.keys(RENTALPROPERTY).map(key => {
    return RENTALPROPERTY[key];
  })
  
  return arry;
}