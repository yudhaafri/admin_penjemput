import axiosInstance from "src/app/interceptor";
import service from "src/app/service";

export const getSSPPayment = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API}/dashboard/ssp-payment`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getRegistrationPeriod = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API}/dashboard/registration-period`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getApprovedFinance = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API}/dashboard/approve-finance`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getApprovalStatus = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API}/dashboard/approval-status`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getAnnualRegistrant = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API}/dashboard/annual-registrant`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getTest = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `https://api-gate.bpkpenaburjakarta.sch.id/assignment/list-assignment-admin`,
    {
      params,
      signal,
      headers: {
        Authorization: "1",
        "x-api-key-shuttle-admin": "secure-scan-key-123",
        school_id: "adcf1bd7-ee81-4a08-a7d2-c31df12662e2",
      },
    }
  );
  return data;
};
