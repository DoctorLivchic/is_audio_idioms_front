import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const signin = (isAuth, cb) => {
    setUser(isAuth);
    cb();
  };
  const signout = (cb) => {
    setUser(false);
    cb();
  };

  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
