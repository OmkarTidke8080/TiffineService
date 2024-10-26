import { createContext, useState } from "react";

// Create context with a default value
export const UserNameContext = createContext({
  userName: "", // Default value for userName
  setUserName: () => {}, // Default empty function for setUserName
});

const UserName = ({ children }) => {
  const [userName, setUserName] = useState(""); // State for userName

  return (
    <UserNameContext.Provider
      value={{
        userName,
        setUserName, // Pass both userName and setUserName to the provider
      }}
    >
      {children}
    </UserNameContext.Provider>
  );
};

export default UserName;
