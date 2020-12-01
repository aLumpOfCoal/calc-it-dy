import React, { useEffect, useState } from 'react';
import uuidv4 from "uuid/v4";

export const interestCertFactory = () => {
    const interestCert = {
        id : uuidv4(),
        name: "" ,
        interestValue: "" ,
        taxLiability: "" 
    }
    return interestCert;
  }

export default interestCertFactory ;