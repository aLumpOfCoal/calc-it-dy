import React from 'react';

const IncomeTaxCalcContext = React.createContext();

//Debug/Development
if (process.env.NODE_ENV !== 'production') {
  IncomeTaxCalcContext.displayName = 'IncomeTaxCalcContext';
}

export function useIncomeTaxCalculator() {
  return React.useContext(IncomeTaxCalcContext);
}

export default IncomeTaxCalcContext;