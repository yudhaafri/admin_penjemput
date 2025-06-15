import React, { useImperativeHandle, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = React.forwardRef(function Component(props, ref) {
  const [loading, setLoading] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        const loadingCount = loading + 1;
        setLoading(loadingCount);
      },
      stop: () => {
        const loadingCount = loading > 0 ? loading - 1 : 0;
        setLoading(loadingCount);
      },
      isLoading: () => loading >= 1,
    }),
    [],
  );

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed z-[9999] w-[100vw] h-[100vh] top-0 bg-[#00000090] text-white flex items-center justify-center animate-fade-in">
      <div className="flex items-center gap-2 animate-bounce">
        <CgSpinner className="animate-spin text-4xl" />
        <div>Memuat...</div>
      </div>
    </div>
  );
});

export default Loader;
