import { useState } from "react";
import AsyncSelectForm from "./index";
import { useStudentPaymentTransactionsQuery } from "src/hooks/services/usePaymentTransaction";

const SelectStudentPaymentForm = ({ ...props }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isFetching } = useStudentPaymentTransactionsQuery([
    "student-payment-options",
    { page, limit, search, ...props.filter },
  ]);

  return (
    <AsyncSelectForm
      {...props}
      data={data?.items}
      totalPages={data?.meta?.totalPages}
      isFetching={isFetching}
      onChangePage={setPage}
      onChangeSearch={setSearch}
      menuPortalTarget={document.body}
    />
  );
};

export default SelectStudentPaymentForm;
