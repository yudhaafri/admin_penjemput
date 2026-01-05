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

export const usePickupDetailQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const id = queryKey[1];
      return PICKUP.getAssigmentDetail(id, signal);
    },
    ...options,
  });
};

export const useStudentQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const params = queryKey[1];
      return PICKUP.getStudentList({ ...params }, signal);
    },
    ...options,
  });
};

export const useStudentDetailQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const id = queryKey[1];
      return PICKUP.getStudentDetail(id, signal);
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

export const addCardMutation = () => {
  return useMutation(
    async ({ id, payload }) => await PICKUP.patchCardShuttel(id, payload)
  );
};

export const exportAssigmentMutation = () => {
  return useMutation(
    async (params) => await PICKUP.getExportAssigmentList(params)
  );
};

export const exportStudentsMutation = () => {
  return useMutation(
    async (params) => await PICKUP.getExportStudentList(params)
  );
};

