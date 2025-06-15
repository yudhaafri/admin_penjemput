import { useQuery } from "react-query";
import { DASHBOARD } from "src/services";

export const useApprovalStatusQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const params = queryKey[1];
      return DASHBOARD.getApprovalStatus({ ...params }, signal);
    },
    ...options,
  });
};

export const useSSPPaymentQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const params = queryKey[1];
      return DASHBOARD.getSSPPayment({ ...params }, signal);
    },
    ...options,
  });
};

export const useApprovedFinanceQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const params = queryKey[1];
      return DASHBOARD.getApprovedFinance({ ...params }, signal);
    },
    ...options,
  });
};

export const useRegistrationPeriodQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const params = queryKey[1];
      return DASHBOARD.getRegistrationPeriod({ ...params }, signal);
    },
    ...options,
  });
};

export const useAnnualRegistrantQuery = (keys, options) => {
  return useQuery({
    queryKey: keys,
    queryFn: ({ signal, queryKey }) => {
      const params = queryKey[1];
      return DASHBOARD.getAnnualRegistrant({ ...params }, signal);
    },
    ...options,
  });
};