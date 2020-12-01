import React, { useEffect, useState } from 'react';
import uuidv4 from "uuid/v4";

export const businessTradeFactory = () => {
    const businessTrade = {
        id : uuidv4(),
        name: "" ,
        turnover: 0 ,
        costOfSales: 0 ,
        otherIncome: 0,
        expenses: 0 ,
        netProfit: 0 ,
        taxLiability: "" 
    }
    return businessTrade;
  }

  export default businessTradeFactory ;