import axiosInstance from "src/app/interceptor";
import service from "src/app/service";

export const getQR = async (qrCode) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/assignment/mobile/scan`,
    {
      params: { code: qrCode },
    }
  );
  return data;
};

export const getCardDetail = async (uid) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/assignment/mobile/external/` + uid
  );
  return data;
};

export const patchCardShuttel = async (id, payload) => {
  const { data } = await axiosInstance.patch(
    `${service.API_BASE}/shuttle/web/student/${id}/card`,
    payload
  );
  return data;
};

export const getAssigmentList = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/assignment/mobile/list-assignment-admin`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getAssigmentDetail = async (id, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/assignment/mobile/list-assignment-admin/${id}`,
    {
      signal,
    }
  );
  return data;
};

export const getStudentList = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/shuttle/web/student`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getStudentDetail = async (id, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/shuttle/web/student/${id}`,
    {
      signal,
    }
  );
  return data?.data;
};
