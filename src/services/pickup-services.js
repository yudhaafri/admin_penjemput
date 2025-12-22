import axiosInstance from "src/app/interceptor";
import service from "src/app/service";

export const getQR = async (qrCode) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/assignment/mobile/scan`,
    {
      headers: {
        Authorization: "",
        "api-key-scan": "secure-scan-key-123",
      },
      params: { code: qrCode },
    }
  );
  return data;
};

export const getCardDetail = async (uid) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/assignment/mobile/external/` +
      uid,
    {
      headers: {
        Authorization: "",
        "api-key-scan": "secure-scan-key-123",
      },
      // params: { code: qrCode },
    }
  );
  return data;
};

export const getAssigmentList = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `${service.API_BASE}/assignment/mobile/list-assignment-admin`,
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
