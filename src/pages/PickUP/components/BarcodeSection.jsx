import { Input } from "src/components";
import BarcodeScannerImg from "/assets/barcode-scanner.png";
import usePickupBarcodeHooks from "../stores/pickup-barcode.hooks";

const BarcodeSection = () => {
  const { barcode, handleSearch } = usePickupBarcodeHooks();
  return (
    <>
      <div className="relative">
        <div className="absolute top-[14px] left-[222px] text-2xl font-medium">
          Scan QR Code Here
        </div>
        <img
          className="w-[700px] h-[430px]"
          src={BarcodeScannerImg}
          alt="barcode-scanner-image"
        />
      </div>
      <Input
        placeholder={"ID Card"}
        onChange={handleSearch}
        value={barcode}
        className="w-[535px] border-2 border-[#314F84]"
      />
    </>
  );
};

export default BarcodeSection;
