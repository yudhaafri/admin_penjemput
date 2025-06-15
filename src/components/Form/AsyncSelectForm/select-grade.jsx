import { useState } from "react";
import { useGradeQuery } from "src/hooks/services/useGrade";
import AsyncSelectForm from "./index";

const SelectGradeForm = ({ ...props }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isFetching, refetch } = useGradeQuery([
    "grade-options",
    { page, limit, search, ...props.filter },
  ], {
    enabled: typeof props?.fetchWhenClick === "undefined"
  });

  return (
    <AsyncSelectForm
      {...props}
      refetch={refetch}
      data={data?.items}
      totalPages={data?.meta?.totalPages}
      getOptionLabel={({ kodeGrade }) => kodeGrade}
      getOptionValue={({ id }) => id}
      isFetching={isFetching}
      onChangePage={setPage}
      onChangeSearch={setSearch}
      menuPortalTarget={document.body}
    />
  );
};

export default SelectGradeForm;
