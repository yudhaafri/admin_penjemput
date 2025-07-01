import { Input } from "src/components";
import BarcodeScannerImg from "/assets/barcode-scanner.png";
import useTappingHooks from "../stores/pickup-tapping.hooks";
import { useEffect, useState } from "react";
import { cardMutation } from "src/hooks/services/usePickup";
import PickupModal from "./PickupModal";

const TappingSection = () => {
  const { uid, connected, setUid } = useTappingHooks();
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const getCardDetail = cardMutation();
  useEffect(() => {
    if (uid) {
      getCardDetail.mutate(uid, {
        onSuccess: (response) => {
          setModalData(response?.data);
          setShowModal(true);

          // Sembunyikan modal setelah beberapa detik (misal 3 detik)
          setTimeout(() => {
            setShowModal(false);
            setUid("");
          }, 3000);
        },
        onError: () => {
          setUid("");
        },
      });
    }
  }, [uid]);
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
      <PickupModal data={modalData} isOpen={showModal} />
    </>
  );
};

export default TappingSection;
