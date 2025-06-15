import React, { useRef } from "react";
import { Loader } from "src/components";

const LoaderContext = React.createContext({
  startLoader: () => null,
  stopLoader: () => null,
});

export function LoaderProvider({ children }) {
  const ref = useRef();
  const startLoader = () => ref?.current?.start();
  const stopLoader = () => ref?.current?.stop();
  const value = React.useMemo(
    () => ({ ref, startLoader, stopLoader }),
    [ref, startLoader, stopLoader],
  );

  return (
    <LoaderContext.Provider value={value}>
      {children}
      <Loader ref={ref} />
    </LoaderContext.Provider>
  );
}

export const useLoader = () => React.useContext(LoaderContext);
