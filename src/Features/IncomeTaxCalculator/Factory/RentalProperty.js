import React, { useEffect, useState } from 'react';
import uuidv4 from "uuid/v4";

export const rentalPropertyFactory = () => {
    const rentalProperty = {
        id : uuidv4(),
        name: "" ,
        turnover: "" ,
        expenses: "" ,
        netProfit: "" ,
        taxLiability: "" 
    }
    return rentalProperty;
  }

export default rentalPropertyFactory ;