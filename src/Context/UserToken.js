import { createContext, useState } from "react";

export let UserToken = createContext(null);

export default function UserTokenProvider({ children }) {
  let [login, setLogin] = useState(null);

  return (
    <UserToken.Provider value={{ login, setLogin }}>
      {children}
    </UserToken.Provider>
  );
}
