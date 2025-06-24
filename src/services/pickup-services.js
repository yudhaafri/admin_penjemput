import axiosInstance from "src/app/interceptor";
import service from "src/app/service";

export const getAssigmentList = async (params, signal) => {
  const { data } = await axiosInstance.get(
    `https://api-gate.bpkpenaburjakarta.sch.id/api/assignment/mobile/list-assignment-admin`,
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
  console.log(data);
  return data;
};
