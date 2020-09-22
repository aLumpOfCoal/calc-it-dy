import React, { useEffect, useState } from 'react';

export const earningCertificateFactory = (index) => {
    const earningCertificate = {
        index : index,
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
    return earningCertificate;
  }