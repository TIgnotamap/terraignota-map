import { createContext, useState } from "react";

const StatusBarContext = createContext();

const StatusBarProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState(null);
  return (
    <StatusBarContext.Provider
      value={{ status, setStatus, defaultStatus, setDefaultStatus }}
    >
      {children}
    </StatusBarContext.Provider>
  );
};

export { StatusBarProvider, StatusBarContext };
