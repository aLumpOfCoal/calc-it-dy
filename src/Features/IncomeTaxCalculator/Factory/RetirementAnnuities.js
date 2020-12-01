import React, { useEffect, useState } from 'react';
import uuidv4 from "uuid/v4";
import rentalPropertyFactory from './RentalProperty';

export const retirementAnnuitiesFactory = () => {
    const retirementAnnuities = {
        id : uuidv4(),
        name: "",
        totalContributions: "",
    }
    return retirementAnnuities;
  }

  export default retirementAnnuitiesFactory