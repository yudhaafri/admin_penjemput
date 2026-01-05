import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ShuttleHistoryTable from "./components/table";
import ShuttleHistoryFilterTable from "./components/filter";
import useShuttleHistoryHooks from "./stores/hooks";
import { InputForm } from "src/components";
import { MdSearch } from "react-icons/md";
import useShuttleHistoryStore from "./stores/store";
import { exportStudentsMutation } from "src/hooks/services/usePickup";
import toast from "react-hot-toast";

const ShuttleHistory = () => {
  const methods = useForm();
  const { watch } = methods;

  const { handleSearch } = useShuttleHistoryHooks();

  const getExport = exportStudentsMutation();

  const { page, limit, search, searchClass, sortBy, sortType } =
    useShuttleHistoryStore((state) => ({
      page: state.page,
      limit: state.limit,
      search: state.search,
      searchClass: state.searchClass,
      sortBy: state.sortBy,
      sortType: state.sortType,
    }));

  const start_date =
    watch("start_date") && dayjs(watch("start_date")).format("YYYY-MM-DD");
  const end_date =
    watch("end_date") && dayjs(watch("end_date")).format("YYYY-MM-DD");

  const onDownload = async (type) => {
    const data = await getExport.mutateAsync({
      type,
      start_date,
      end_date: end_date || start_date,
      page,
      limit,
      search: search,
      class_student: searchClass,
      sort_by: sortBy,
      sort_order: sortType ?? "ASC",
    });

    if (data?.file_url) {
      const link = document.createElement("a");
      link.href = data.file_url;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("File template berhasil di download");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="pt-[26px] pb-[17px] w-[90%] mx-[53px] my-auto">
        <div className="text-[28px] font-bold">Riwayat Penjemputan</div>
        <ShuttleHistoryFilterTable />
      </div>
      <div className="py-[18px] px-[44px] rounded-[5px] bg-white w-[90%] mx-[53px] my-auto">
        <div className="flex justify-between gap-3 pb-3">
          <div className="flex items-center gap-3 pb-3">
            <button
              onClick={() => onDownload("csv")}
              className="flex items-center gap-2 p-2 bg-sky-600 text-white text-xs font-medium rounded hover:bg-sky-700 active:bg-sky-800 transition duration-150"
            >
              Unduh CSV
            </button>
            <button
              onClick={() => onDownload("excel")}
              className="flex items-center gap-2 p-2 bg-sky-600 text-white text-xs font-medium rounded hover:bg-sky-700 active:bg-sky-800 transition duration-150"
            >
              Unduh Excel
            </button>
            <button
              onClick={() => onDownload("pdf")}
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

export default ShuttleHistory;
