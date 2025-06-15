import { AsyncSelectForm } from "src/components";
import { useMasterClassMeetingTopicQuery } from "src/hooks/services/useClass";

const SelectClassForm = ({ filter, ...props }) => {
  const { data, isFetching, refetch } = useMasterClassMeetingTopicQuery(
    [
      "program-with-school-options",
      {
        psbClassYearId: filter.psbClassYearId,
        levelID: filter.levelID,
        schoolID: filter.schoolID,
        programId: filter.programId
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
      getOptionLabel={(opt) => `${opt.class} ${opt?.major && "(" + opt.major + ")"}` }
      getOptionValue={(opt) => opt.id}
      isFetching={isFetching}
      menuPortalTarget={document.body}
    />
  );
};

export default SelectClassForm;
