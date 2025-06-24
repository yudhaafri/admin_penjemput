import { useEffect, useRef, useState } from "react";

const usePickupBarcodeHooks = () => {
  const [barcode, setBarcode] = useState("");
  const bufferRef = useRef("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (e.key === "Enter") {
        if (bufferRef.current.length > 0) {
          setBarcode(bufferRef.current);
          bufferRef.current = "";
        }
        return;
      }

      bufferRef.current += e.key;

      timeoutRef.current = setTimeout(() => {
        bufferRef.current = "";
      }, 100);
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);

  const handleSearch = (e) => {
    setBarcode(e.target.value);
  };
  return {
    barcode,
    setBarcode,
    handleSearch,
  };
};

export default usePickupBarcodeHooks;
