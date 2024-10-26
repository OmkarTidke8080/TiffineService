import { createContext, useState } from "react";

export const UserSignUpTypeContext = createContext({
  selectedType: "",
  setSelectedType: () => {},
});

const UserSignUpType = ({ children }) => {
  const [selectedType, setSelectedType] = useState("");

  return (
    <UserSignUpTypeContext.Provider
      value={{
        selectedType,
        setSelectedType,
      }}
    >
      {children}
    </UserSignUpTypeContext.Provider>
  );
};

export default UserSignUpType;
