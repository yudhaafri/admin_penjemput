import { useQuery } from "react-query";
import { PICKUP } from "src/services";

export const usePickupQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const params = queryKey[1];
      return PICKUP.getAssigmentList({ ...params }, signal);
    },
    ...options,
  });
};
