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