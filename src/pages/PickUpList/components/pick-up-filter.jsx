import { TableFilter } from "src/components";
import SelectYearForm from "src/components/Form/AsyncSelectForm/select-year";
import useRegisterStudentStore from "../stores/pick-up-list-store";
import useRegisterStudentHooks from "../stores/pick-up-list-hooks";

const PickUpFilterTable = () => {
  const { defaultColumns, visibleColumns } = useRegisterStudentStore(
    (state) => ({
      defaultColumns: state.defaultColumns,
      visibleColumns: state.visibleColumns,
    })
  );

  const { handleColumnVisibility } = useRegisterStudentHooks();

  return (
    <div className="flex items-center gap-3 py-3">
      <TableFilter
        tableColumn={defaultColumns}
        toggleColumnVisibility={handleColumnVisibility}
        visibleColumns={visibleColumns}
      />
      <div className="w-1/3">
        <SelectYearForm
          name="psb_year_filter"
          placeholder="Pilih Tahun PSB"
          withoutPrefix
          isClearable
        />
      </div>
    </div>
  );
};

export default PickUpFilterTable;
