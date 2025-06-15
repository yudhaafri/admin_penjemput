import { useState } from "react";
import { useInstitutionsQuery } from "src/hooks/services/useMasterData";
import AsyncSelectForm from "./index";

const SelectInstitutionsForm = ({ ...props }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isFetching } = useInstitutionsQuery(
    ["instititution-options", { page, limit, search, ...props.filter }],
  );
  
  return (
    <AsyncSelectForm
      {...props}
      data={data?.data}
      totalPages={data?.meta?.totalPages}
      getOptionLabel={({ name }) => name}
      getOptionValue={({ id }) => id}
      isFetching={isFetching}
      onChangePage={setPage}
      onChangeSearch={setSearch}
    />
  );
};

export default SelectInstitutionsForm;
