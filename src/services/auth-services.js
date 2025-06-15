import service from "src/app/service";
import axiosInstance from "src/app/interceptor";

export const signIn = async (params) => {
  const { data } = await axiosInstance.post(`${service.STUDENT_ADMIN_API}/api/auth/login`, params);
  return data;
}

export const getAccessToken = async (payload) => {
  const { data } = await axiosInstance.post(
    `${service.BE_IDENTITY_API}/auth/access-token-modules`,
    payload,
  );

  return { data };
};

export const chooseFoundations = async (payload) => {
  const { data } = await axiosInstance.post(
    `${service.BE_IDENTITY_API}/auth/access-modules`,
    payload,
  );

  return { data };
};

export const signOut = async (payload) => {
  const response = await axiosInstance.post(
    `${service.BE_IDENTITY_API}/auth/logout-modules`,
    payload,
  );

  return response;
};


