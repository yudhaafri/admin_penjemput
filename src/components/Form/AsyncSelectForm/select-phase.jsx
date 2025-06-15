import { useState } from "react";
import { usePhaseQuery } from "src/hooks/services/usePhase";
import AsyncSelectForm from "./index";

const SelectPhaseForm = ({ ...props }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isFetching } = usePhaseQuery([
    "phase-options",
    { page, limit, search, ...props.filter },
  ]);

  return (
    <AsyncSelectForm
      {...props}
      data={data?.items}
      totalPages={data?.meta?.totalPages}
      getOptionLabel={({ gelombang }) => gelombang}
      getOptionValue={({ id }) => id}
      isFetching={isFetching}
      onChangePage={setPage}
      onChangeSearch={setSearch}
      menuPortalTarget={document.body}
    />
  );
};

export default SelectPhaseForm;
