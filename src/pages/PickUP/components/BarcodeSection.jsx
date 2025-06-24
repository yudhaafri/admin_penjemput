import { Input } from "src/components";
import BarcodeScannerImg from "/assets/barcode-scanner.png";
import usePickupBarcodeHooks from "../stores/pickup-barcode.hooks";
import { qrMutation } from "src/hooks/services/usePickup";
import { useEffect, useState } from "react";
import PickupModal from "./PickupModal";

const BarcodeSection = () => {
  const { barcode, setBarcode, handleSearch } = usePickupBarcodeHooks();
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const getQR = qrMutation();
  useEffect(() => {
    if (barcode) {
      let array = barcode?.split("/");
      let qrCode = array[array?.length - 1];
      getQR.mutate(qrCode, {
        onSuccess: (response) => {
          setModalData(response?.data);
          setShowModal(true);

          // Sembunyikan modal setelah beberapa detik (misal 3 detik)
          setTimeout(() => {
            setShowModal(false);
            setBarcode("");
          }, 3000);
        },
        onError: () => {
          setBarcode("");
        },
      });
    }
  }, [barcode]);
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
        placeholder={"QR Code"}
        onChange={handleSearch}
        // disabled
        value={barcode ?? ""}
        className="w-[535px] border-2 border-[#314F84]"
      />
      <PickupModal data={modalData} isOpen={showModal} />
    </>
  );
};

export default BarcodeSection;
