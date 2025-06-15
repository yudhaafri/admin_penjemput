import { useMemo, useState } from "react";
import { usePSBYearQuery } from "src/hooks/services/usePSBYear";
import AsyncSelectForm from "./index";

const SelectYearForm = ({ selectedYear = "", ...props }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isFetching } = usePSBYearQuery(
    ["psb-year-options", { page, limit, search, sortBy: "psbClassYear:DESC", ...props.filter }],
  );

  const disabledOptions = useMemo(() => {
    if (!selectedYear) return [];
    return Array.isArray(selectedYear) ? selectedYear.map(v => v.id) : [selectedYear.id];
  }, [selectedYear]);

  return (
    <AsyncSelectForm
      {...props}
      data={data?.items}
      totalPages={data?.meta?.totalPages}
      getOptionLabel={({ psbClassYear }) => psbClassYear}
      getOptionValue={({ id }) => id}
      isOptionDisabled={(option) => disabledOptions.includes(option.id)}
      isFetching={isFetching}
      onChangePage={setPage}
      onChangeSearch={setSearch}
      menuPortalTarget={document.body}
    />
  );
};

export default SelectYearForm;
