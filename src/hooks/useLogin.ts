import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../contexts/authContext";

export function useLogin(): AuthContextProps {
    const context = useContext(AuthContext);
  
    return context;
  }