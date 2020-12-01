import React, { useEffect, useState } from 'react';
import uuidv4 from "uuid/v4";

export let medicalAidFactory = () => {
    let medicalAid = {
        id : uuidv4(),
        name: "" ,
        fixedDependents: true,
        totalContributions: "",
        additionalExpenses: "",
        periodValues: ["", "", "", "", "", "", "", "", "", "", "", ""],
        periodValue: 0
    }
    return medicalAid;
  }

  export default medicalAidFactory ;