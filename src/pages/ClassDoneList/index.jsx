import dayjs from "dayjs";
import React from "react";
import { Button, InputForm } from "src/components";
import { LucideHome } from "lucide-react";
import usePickUpListHooks from "./stores/class-done-list-hooks";
import { FormProvider, useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import PickUpTable from "./components/pick-up-table";
import { useNavigate } from "react-router-dom";

const ClassDoneList = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const { handleSearch } = usePickUpListHooks();

  return (
    <FormProvider {...methods}>
      <div className="h-full bg-pickup-page flex flex-col items-center py">
        <div className="py-[36px] px-[44px] rounded-[5px] bg-white w-[90%] h-[90%] mx-[53px] my-auto">
          <div className="flex justify-between">
            <div className="text-[28px] font-bold">Daftar Kelas Selesai</div>
            <Button
              type="button"
              className="bg-primary-700 text-white px-6 py-2 rounded-md flex gap-1"
              onClick={() => navigate("/pick-up")}
            >
              Home <LucideHome />
            </Button>
          </div>
          <div className="text-[28px] font-bold text-[#AEAEB3]">
            {dayjs(new Date()).format("YYYY-MM-DD")}
          </div>
          <div className="flex flex-col space-y-3 2sm:flex-row 2sm:items-center 2sm:justify-between 2sm:space-y-0 my-4">
            <InputForm
              name="search"
              placeholder={"Masukkan Kelas"}
              preffixIcon={
                <div className="pl-3">
                  <MdSearch className="text-[#495057]" />
                </div>
              }
              onValueChanged={handleSearch}
              className="w-80"
            />
          </div>
          <PickUpTable />
        </div>
      </div>
    </FormProvider>
  );
};

export default ClassDoneList;
