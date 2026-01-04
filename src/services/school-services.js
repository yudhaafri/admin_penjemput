import service from "src/app/service";
import axiosInstance from "src/app/interceptor";
import axios from "axios";

/**
 * NEW - SSO - list school must be selected from student admin
 * service for select-school-org dropdown
 */
export const getSchoolOrganization = async (token, params, signal) => {
  const { data } = await axiosInstance.get(`${service.API_BASE}/shuttle/web/auth/users/token`, {
    params,
    signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// NEW - SSO - choose first school after login from student admin
export const patchSchoolOrganization = async (params) => {
  const { data } = await axiosInstance.post(
    `${service.API_IDENTITY}/auth/access-modules`,
    params,
  );
  return data;
};

// Generate Access Token From SSO
export const getAccessToken = async (payload) => {
  const { data } = await axiosInstance.post(
    `${service.API_IDENTITY}/auth/access-token-modules`,
    payload,
  );

  return { data };
};