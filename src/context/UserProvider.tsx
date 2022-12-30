import { ReactNode, useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(
    (JSON.parse(localStorage.getItem("currentUser")!) || {}) as any
  );

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
