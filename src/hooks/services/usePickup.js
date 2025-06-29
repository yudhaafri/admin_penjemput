import { useMutation, useQuery } from "react-query";
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

export const qrMutation = () => {
  return useMutation(async (qrCode) => await PICKUP.getQR(qrCode));
};

export const cardMutation = () => {
  return useMutation(async (uid) => await PICKUP.getCardDetail(uid));
};
