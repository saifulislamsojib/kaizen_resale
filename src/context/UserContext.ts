import { createContext, useContext } from "react";

interface ContextValue {
  user: any;
  setUser: any;
}

const UserContext = createContext({} as ContextValue);

export const useUser = () => useContext(UserContext);

export default UserContext;
