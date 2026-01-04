import { DETAIL_STUDENT_LIST_QUERY } from "../lib/constant";
import { useStudentDetailQuery } from "src/hooks/services/usePickup";
import { useParams } from "react-router-dom";

const useShuttleHistoryHooks = () => {
  const { id } = useParams();

  const { data: student, refetch } = useStudentDetailQuery([
    DETAIL_STUDENT_LIST_QUERY,
    id,
  ]);

  return {
    student,
    refetch
  };
};

export default useShuttleHistoryHooks;
