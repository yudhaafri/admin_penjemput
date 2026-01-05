import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import useDetailShuttleHooks from "./stores/hooks";
import { Input } from "src/components";
import Breadcrumbs from "src/components/Breadcrumbs";

const DetailShuttle = () => {
  const methods = useForm();

  const { student } = useDetailShuttleHooks();
  const breadcrumbItems = [{ label: "Riwayat Penjemputan", path: "/shuttle-history" }, { label: "Details" }];

  return (
    <FormProvider {...methods}>
      <div className="flex flex-row items-center justify-between pt-[26px] pb-[17px] w-[90%] mx-[53px] my-auto">
        <div className="text-[28px] font-bold">Details</div>
        <Breadcrumbs items={breadcrumbItems} />
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
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[5px] overflow-x-hidden">
            <div className="py-[10px] px-[19px] bg-[#556E9B] text-white">
              Informasi Penjemput
            </div>
            <div className="py-[8px] px-[19px] bg-white">
              <div className="flex flex-col items-center">
                <div>Foto Penjemput</div>
                <img
                  src={student?.path_image ?? "/assets/default-profile.png"}
                  alt="student"
                  className="mx-auto w-[157px] h-[188px] object-contain"
                />
              </div>
              <Input
                label={"Nama Penjemput"}
                disabled
                value={student?.full_name ?? ""}
                className="border-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={"Tanggal"}
                  disabled
                  value={student?.class ?? ""}
                  className="border-2"
                />
                <Input
                  label={"Jam"}
                  disabled
                  value={student?.nsp ?? ""}
                  className="border-2"
                />
              </div>

              <Input
                label={"Lokasi"}
                disabled
                value={student?.school_name ?? ""}
                className="border-2"
              />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default DetailShuttle;
