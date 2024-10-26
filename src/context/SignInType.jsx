import { createContext, useState } from "react";

// Create context with a default value
export const SignInContext = createContext({
  signInType: "", // Default value for userName
  setSignInType: () => {}, // Default empty function for setUserName
});

const SignInType = ({ children }) => {
  const [signInType, setSignInType] = useState(""); // State for userName

  return (
    <SignInType.Provider
      value={{
        signInType,
        setSignInType, // Pass both userName and setUserName to the provider
      }}
    >
      {children}
    </SignInType.Provider>
  );
};

export default SignInContext;
