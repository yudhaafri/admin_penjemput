import { useMutation } from "react-query";
import { AUTH } from "src/services";

export const useSignIn = () => {
  return useMutation((payload) => AUTH.signIn(payload));
};

export const useGetAccessToken = () => {
  return useMutation((payload) => AUTH.getAccessToken(payload));
};

export const useChooseFoundation = () => {
  return useMutation((payload) => AUTH.chooseFoundations(payload));
};

export const useLogout = () => {
  return useMutation((payload) => AUTH.signOut(payload));
};
