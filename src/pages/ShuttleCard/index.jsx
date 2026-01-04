import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ShuttleHistoryTable from "./components/table";
import useShuttleCardHooks from "./stores/hooks";
import { InputForm } from "src/components";
import { MdSearch } from "react-icons/md";

const ShuttleCard = () => {
  const methods = useForm();

  const { handleSearch } = useShuttleCardHooks();

  return (
    <FormProvider {...methods}>
      <div className="pt-[26px] pb-[17px] w-[90%] mx-[53px] my-auto">
        <div className="text-[28px] font-bold">Riwayan Penjemputan</div>
      </div>
      <div className="py-[18px] px-[44px] rounded-[5px] bg-white w-[90%] mx-[53px] my-auto">
        <div className="flex justify-between gap-3 pb-3">
          <div className="flex items-center gap-3 pb-3">
            <button
              // onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 p-2 bg-sky-600 text-white text-xs font-medium rounded hover:bg-sky-700 active:bg-sky-800 transition duration-150"
            >
              Unduh CSV
            </button>
            <button
              // onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 p-2 bg-sky-600 text-white text-xs font-medium rounded hover:bg-sky-700 active:bg-sky-800 transition duration-150"
            >
              Unduh Excel
            </button>
            <button
              // onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 p-2 bg-sky-600 text-white text-xs font-medium rounded hover:bg-sky-700 active:bg-sky-800 transition duration-150"
            >
              Unduh PDF
            </button>
          </div>
          <InputForm
            name="search"
            placeholder={"Masukkan nama siswa yang Anda cari disini..."}
            preffixIcon={
              <div className="pl-3">
                <MdSearch className="text-[#495057]" />
              </div>
            }
            onValueChanged={handleSearch}
            className="w-[495px]"
          />
        </div>
        <ShuttleHistoryTable />
      </div>
    </FormProvider>
  );
};

export default ShuttleCard;
