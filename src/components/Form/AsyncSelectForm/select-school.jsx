import { useState } from "react";
import { usePSBSchoolQuery } from "src/hooks/services/useSchool";
import AsyncSelectForm from "./index";

const SelectSchoolForm = ({ ...props }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isFetching } = usePSBSchoolQuery(
    ["school-options", { page, limit, search, isActive: true, ...props.filter }],
  );
  
  return (
    <AsyncSelectForm
      {...props}
      data={data?.items}
      totalPages={data?.meta?.totalPages}
      getOptionLabel={({ schoolName }) => schoolName}
      getOptionValue={({ id }) => id}
      isFetching={isFetching}
      onChangePage={setPage}
      onChangeSearch={setSearch}
      menuPortalTarget={document.body}
    />
  );
};

export default SelectSchoolForm;
