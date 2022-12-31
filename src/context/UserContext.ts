import { createContext, Dispatch, useContext } from "react";
import User from "../types/User";

interface ContextValue {
  user: User;
  setUser: Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext({} as ContextValue);

export const useUser = () => useContext(UserContext);

export default UserContext;
