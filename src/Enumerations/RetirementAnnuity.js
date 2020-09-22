
/**
 * @enum RA
 */
const RA = Object.freeze({
  ["0"]: {
    value: "0",
    title: "",
  },
  ["1"]: {
    value: "1",
    title: "1 Certificate",
  },
  ["2"]: {
    value: "2",
    title: "2 Certificates",
  },
  ["3"]: {
    value: "3",
    title: "3 Certificates",
  },
  ["4"]: {
    value: "4",
    title: "4 Certificates",
  },
  ["5"]: {
    value: "5",
    title: "5 Certificates",
  },
  ["6"]: {
    value: "6",
    title: "6 Certificates",
  },
  ["7"]: {
    value: "7",
    title: "7 Certificates",
  },
  ["8"]: {
    value: "8",
    title: "8 Certificates",
  },
  ["9"]: {
    value: "9",
    title: "9 Certificates",
  },
  ["10"]: {
    value: "10",
    title: "10 Certificates",
  }
})

export default RA;

/**
 * Returns the RA enumeration as an option array
 */
export const rAAsArray = () => {
 
  const arry = Object.keys(RA).map(key => {
    return RA[key];
  })
  
  return arry;
}