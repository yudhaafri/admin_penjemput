import { Input } from "src/components";
import PickupBanner from "/assets/pickup-banner.svg";
import usePickupBarcodeHooks from "../stores/pickup-barcode.hooks";
import { cardMutation, qrMutation } from "src/hooks/services/usePickup";
import { useEffect, useState } from "react";
import PickupModal from "./PickupModal";
import useTappingHooks from "../stores/pickup-tapping.hooks";
import { TYPE_SHUTTLE } from "../lib/pickup.constants";

const BarcodeSection = () => {
  const { barcode, setBarcode, handleSearch } = usePickupBarcodeHooks();
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { uid, connected, setUid } = useTappingHooks();
  const getCardDetail = cardMutation();
  const getQR = qrMutation();

  useEffect(() => {
    setShowModal(false);
    if (barcode) {
      let array = barcode?.split("/");
      let qrCode = array[array?.length - 1];
      getQR.mutate(qrCode, {
        onSuccess: (response) => {
          setModalData({ ...response?.data, type: TYPE_SHUTTLE.BARCODE });
          setShowModal(true);
        },
        onError: () => {
          setBarcode("");
        },
      });
    }
  }, [barcode]);

  useEffect(() => {
    if (uid) {
      setShowModal(false);
      getCardDetail.mutate(uid, {
        onSuccess: (response) => {
          setModalData({ ...response?.data, type: TYPE_SHUTTLE.TAPPING });
          setShowModal(true);
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
        <div className="absolute top-[14px] left-[150px] text-2xl font-medium">
          Scan QR Code / Tapping Card Here
        </div>
        <img
          className="w-[700px] h-[430px]"
          src={PickupBanner}
          alt="barcode-scanner-image"
        />
      </div>
      <Input
        placeholder={"QR Code"}
        onChange={handleSearch}
        disabled
        value={barcode ?? ""}
        className="w-[535px] border-2 border-[#314F84]"
      />
      {!connected && (
        <p>Tapping Card belum terkoneksi atau bridge belum dijalankan</p>
      )}
      <PickupModal
        data={modalData}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
          setBarcode("");
          setUid("");
        }}
      />
    </>
  );
};

export default BarcodeSection;
