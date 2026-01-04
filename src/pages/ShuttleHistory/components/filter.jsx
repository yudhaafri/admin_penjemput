import { DatepickerForm, InputForm, TableFilter } from "src/components";
// import SelectYearForm from "src/components/Form/AsyncSelectForm/select-year";
import useShuttleHistoryStore from "../stores/store";
import useShuttleHistoryHooks from "../stores/hooks";
import { MdSearch } from "react-icons/md";
import { useFormContext } from "react-hook-form";

const ShuttleHistoryFilterTable = () => {
  const { defaultColumns, visibleColumns } = useShuttleHistoryStore(
    (state) => ({
      defaultColumns: state.defaultColumns,
      visibleColumns: state.visibleColumns,
    })
  );

  const methods = useFormContext();

  const { watch } = methods;

  const { handleColumnVisibility, handleSearchClass } = useShuttleHistoryHooks();

  return (
    <div className="flex items-center gap-3 py-3">
      <TableFilter
        tableColumn={defaultColumns}
        toggleColumnVisibility={handleColumnVisibility}
        visibleColumns={visibleColumns}
      />
      <div className="w-1/3">
        <DatepickerForm name="start_date" placeholder="Pilih tanggal" />
      </div>
      <div>~</div>
      <div className="w-1/3">
        <DatepickerForm
          name="end_date"
          placeholder="Pilih tanggal"
          minDate={watch("start_date")}
        />
      </div>
      <div className="w-1/3">
        <InputForm
          name="search_class"
          placeholder={"Masukkan Kelas"}
          preffixIcon={
            <div className="pl-3">
              <MdSearch className="text-[#495057]" />
            </div>
          }
          onValueChanged={handleSearchClass}
          className="w-80"
        />
      </div>
    </div>
  );
};

export default ShuttleHistoryFilterTable;
