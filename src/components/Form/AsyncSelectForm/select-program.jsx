import { AsyncSelectForm } from "src/components";
import { useProgramMasterClassWithSchoolIdQuery } from "src/hooks/services/useClass";

const SelectProgramForm = ({ filter, ...props }) => {
  const { data, isFetching, refetch } = useProgramMasterClassWithSchoolIdQuery(
    [
      "program-with-school-options",
      {
        psbClassYearId: filter.psbClassYearId,
        levelID: filter.levelID,
        schoolID: filter.schoolID,
      },
    ],
    {
      enabled: !!props?.filter,
    }
  );

  return (
    <AsyncSelectForm
      {...props}
      refetch={refetch}
      data={data?.data}
      getOptionLabel={(opt) => opt.program}
      getOptionValue={(opt) => opt.programID}
      isFetching={isFetching}
      menuPortalTarget={document.body}
    />
  );
};

export default SelectProgramForm;
