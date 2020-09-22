
/**
 * @enum BUSINESSTRADE
 */
const BUSINESSTRADE = Object.freeze({
  ["0"]: {
    value: "0",
    title: "",
  },
  ["1"]: {
    value: "1",
    title: "1 Concern",
  },
  ["2"]: {
    value: "2",
    title: "2 Concerns",
  },
  ["3"]: {
    value: "3",
    title: "3 Concerns",
  },
  ["4"]: {
    value: "4",
    title: "4 Concerns",
  },
  ["5"]: {
    value: "5",
    title: "5 Concerns",
  },
  ["6"]: {
    value: "6",
    title: "6 Concerns",
  },
  ["7"]: {
    value: "7",
    title: "7 Concerns",
  },
  ["8"]: {
    value: "8",
    title: "8 Concerns",
  },
  ["9"]: {
    value: "9",
    title: "9 Concerns",
  },
  ["10"]: {
    value: "10",
    title: "10 Concerns",
  }
})

export default BUSINESSTRADE;

/**
 * Returns the BUSINESSTRADE enumeration as an option array
 */
export const businessTradeAsArray = () => {
 
  const arry = Object.keys(BUSINESSTRADE).map(key => {
    return BUSINESSTRADE[key];
  })
  
  return arry;
}