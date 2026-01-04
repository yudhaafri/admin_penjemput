import Cookies from "js-cookie";
import { useMutation, useQuery } from "react-query";
import { SCHOOL } from "src/services";
import useStore from "src/stores";
import { useShallow } from "zustand/react/shallow";

export const useSchoolOrgsQuery = (keys, options) => {
  const { session } = useStore(
    useShallow((state) => ({
      session: state.session,
    })),
  );
  return useQuery({
    queryKey: keys,
    queryFn: async ({ signal, queryKey }) => {
      try {
        const params = queryKey[1];
        const response = await SCHOOL.getSchoolOrganization(
          session,
          params,
          signal,
        );
        return response;
      } catch (error) {
        if (error.status === 401) {
          Cookies.remove(import.meta.env.VITE_COOKIE_SESSION_NAME, {
            domain: import.meta.env.VITE_SUB_DOMAIN,
          });
          Cookies.remove(import.meta.env.VITE_COOKIE_EMAIL_NAME, {
            domain: import.meta.env.VITE_SUB_DOMAIN,
          });
        }
        return [];
      }
    },
    ...options,
  });
};

export const useSchoolOrgChoose = () => {
  return useMutation((payload) => SCHOOL.patchSchoolOrganization(payload));
};

export const useGetAccessToken = () => {
  return useMutation((payload) => SCHOOL.getAccessToken(payload));
};
