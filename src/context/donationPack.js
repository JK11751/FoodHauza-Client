import React, {createContext, useContext, useState} from "react";

const DonationPackContext = createContext();

export const DonationPackProvider = ({children}) => {
  const [donationPack, setDonationPack] = useState([]);

  return (
    <DonationPackContext.Provider
      value={{
        donationPack,
        setDonationPack,
      }}
    >
      {children}
    </DonationPackContext.Provider>
  );
};

export const DonationPackState = () => {
  return useContext(DonationPackContext);
};
