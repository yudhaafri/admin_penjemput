import { Input } from "src/components";
import BarcodeScannerImg from "/assets/barcode-scanner.png";
import useTappingHooks from "../stores/pickup-tapping.hooks";

const TappingSection = () => {
  const { uid, connected, setUid } = useTappingHooks();
  return (
    <>
      <div className="relative">
        <div className="absolute top-[14px] left-[222px] text-2xl font-medium">
          Tapping Card Here
        </div>
        <img
          className="w-[700px] h-[430px]"
          src={BarcodeScannerImg}
          alt="barcode-scanner-image"
        />
      </div>
      <Input
        placeholder={"ID Card"}
        onChange={setUid}
        value={uid}
        className="w-[535px] border-2 border-[#314F84]"
      />
    </>
  );
};

export default TappingSection;
