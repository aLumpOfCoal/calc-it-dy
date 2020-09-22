
/**
 * @enum AGECATEGORY
 */
const TAXYEAR = Object.freeze({
  ["2018"]: {
    value: "2018",
    title: "2018 (March 2017 - Feb 2018) ",
  },
  ["2019"]: {
    value: "2019",
    title: "2019 (March 2018 - Feb 2019) ",
  },
  ["2020"]: {
    value: "2020",
    title: "2020 (March 2019 - Feb 2020) ",
  },
  ["2021"]: {
    value: "2021",
    title: "2021 (March 2020 - Feb 2021) ",
  }
})

export default TAXYEAR;

/**
 * Returns the TAXYEAR enumeration as an option array
 */
export const taxYearAsArray = () => {
 
  const arry = Object.keys(TAXYEAR).map(key => {
    return TAXYEAR[key];
  })
  
  return arry;
}