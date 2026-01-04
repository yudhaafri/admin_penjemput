import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useDetailShuttleCardHooks from "./stores/hooks";
import { Button, Input } from "src/components";
import ScanModal from "./components/ScanModal";
import { addCardMutation } from "src/hooks/services/usePickup";
import { useParams } from "react-router-dom";
import useTappingHooks from "./stores/pickup-tapping.hooks";

const DetailShuttleCard = () => {
  const methods = useForm();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [typeCard, setTypeCard] = useState("");

  const { student, refetch } = useDetailShuttleCardHooks();
  const { uid, setUid } = useTappingHooks();
  const addCard = addCardMutation();

  const ScanCardHandle = (type) => {
    setShowModal(true), setTypeCard(type);
  };

  useEffect(() => {
    if (uid && !typeCard) {
      setUid("");
    }

    if (uid && typeCard) {
      addCard.mutate(
        { id, payload: { type: typeCard, card_number: uid } },
        {
          onSuccess: () => {
            setShowModal(false);
            setUid("");
            setTypeCard("");
            refetch();
          },
          onError: () => {
            setUid("");
            setTypeCard("");
            setShowModal(false);
          },
        }
      );
    }
  }, [uid, typeCard]);

  return (
    <FormProvider {...methods}>
      <div className="pt-[26px] pb-[17px] w-[90%] mx-[53px] my-auto">
        <div className="text-[28px] font-bold">Lihat Profil</div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-[90%] mx-[53px]">
        <div className="flex flex-col gap-4">
          <div className="rounded-[5px] overflow-x-hidden">
            <div className="py-[10px] px-[19px] bg-[#556E9B] text-white">
              Profile Siswa
            </div>
            <div className="py-[8px] px-[19px] bg-white">
              <div className="flex flex-col items-center">
                <div>Foto Siswa</div>
                <img
                  src={student?.path_image ?? "/assets/default-profile.png"}
                  alt="student"
                  className="mx-auto w-[157px] h-[188px] object-contain"
                />
              </div>
              <Input
                label={"Nama Lengkap"}
                disabled
                value={student?.full_name ?? ""}
                className="border-2"
              />
              <Input
                label={"Kelas"}
                disabled
                value={student?.class ?? ""}
                className="border-2"
              />
              <Input
                label={"NSP"}
                disabled
                value={student?.nsp ?? ""}
                className="border-2"
              />
              <Input
                label={"Nama Sekolah"}
                disabled
                value={student?.school_name ?? ""}
                className="border-2"
              />
            </div>
          </div>

          <div className="rounded-[5px] overflow-x-hidden">
            <div className="py-[10px] px-[19px] bg-[#556E9B] text-white">
              Nomor Kartu Pelajar & Penjemput
            </div>
            <div className="flex flex-col gap-2 py-[22px] px-[19px] bg-white">
              <Input
                disabled
                value={student?.card_number ?? ""}
                className="border-2"
              />
              <Button
                onClick={() => ScanCardHandle("card")}
                type="button"
                className="mt-2 text-white w-[140px] rounded-[10px] text-md font-bold border-primary-700 bg-primary-700 hover:bg-primatext-primary-700 hover:border-primatext-primary-700 flex-1 py-2 space-x-1"
              >
                <span>
                  {student?.card_number ? "Edit Kartu" : "Scan Kartu"}
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[5px] overflow-x-hidden">
            <div className="py-[10px] px-[19px] bg-[#556E9B] text-white">
              Tambah Kartu
            </div>
            <div className="flex flex-col gap-2 py-[8px] px-[19px] bg-white">
              <Input
                label={"NSP"}
                disabled
                value={student?.nsp ?? ""}
                className="border-2"
              />
              <Input
                label={"Nomor Kartu"}
                disabled
                value={student?.additional_card_number ?? ""}
                className="border-2"
              />
              <Button
                onClick={() => ScanCardHandle("additional_card")}
                type="button"
                className="mt-2 text-white w-[140px] rounded-[10px] text-md font-bold border-primary-700 bg-primary-700 hover:bg-primatext-primary-700 hover:border-primatext-primary-700 flex-1 py-2 space-x-1"
              >
                <span>
                  {student?.additional_card_number
                    ? "Edit Kartu"
                    : "Scan Kartu"}
                </span>
              </Button>
            </div>
          </div>

          <div className="rounded-[5px] overflow-x-hidden">
            <div className="py-[10px] px-[19px] bg-[#556E9B] text-white">
              Cetak Kartu
            </div>
            <div className="py-[8px] px-[19px] bg-white">
              <Button
                type="button"
                className="mt-2 text-primary-700 w-full rounded-[10px] text-md font-bold border border-primary-700 bg-white hover:bg-primary-700 hover:text-white hover:border-primatext-primary-700 flex-1 py-2 space-x-1"
              >
                <span>Cetak Kartu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ScanModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
    </FormProvider>
  );
};

export default DetailShuttleCard;
