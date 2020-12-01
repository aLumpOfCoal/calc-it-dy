import React, { useEffect, useState } from 'react';
import uuidv4 from "uuid/v4";

export const earningCertificateFactory = () => {
    console.log(' FACTORY OPERATION ')
    let earningCertificate = {
        id : uuidv4(),
        name :"" ,
        taxableEarnings: "",
        pAYE: "",
        uIF: "",
        medical: "",
        rA: "",
        taSwitch: false,
        travelAllowance: "",
        logbook: false ,
        lbMajority: false ,
        netProfit: 0,
        taxLiability: "",
    }
    return earningCertificate;
  }

export default earningCertificateFactory ;