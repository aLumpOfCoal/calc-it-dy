import React, { useEffect, useState } from 'react';
import uuidv4 from "uuid/v4";

export const capitalGainsFactory = () => {
    const capitalGains = {
        id : uuidv4(),
        name :"" ,
        taxableEarnings: "",
        pAYE: "",
        uIF: "",
        medical: "",
        rA: "",
        travelAllowance: "",
        logbook: false ,
        lbMajority: false ,
        taxLiability: "",
    }
    return capitalGains;
  }
