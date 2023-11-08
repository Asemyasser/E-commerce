import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider({ children }) {
  let [counter, setCounter] = useState(0);

  function changeCounter() {
    setCounter(counter + 1);
  }

  return (
    <CounterContext.Provider value={{ counter, changeCounter }}>
      {children}
    </CounterContext.Provider>
  );
}
