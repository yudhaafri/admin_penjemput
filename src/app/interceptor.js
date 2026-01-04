import axios from "axios";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";

import service from "./service";
import useStore from "src/stores";
import Cookies from "js-cookie";

/**
 * Axios interceptor configuration module.
 * @module interceptor
 */

/**
 * Default headers for API requests.
 * @type {Object}
 */
const headersReg = {
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  "Content-Type": "application/json",
  Authorization: "",
  Accept: "*/*",
  "Accept-Language": "id",
};

/**
 * Axios instance with custom configuration.
 * @type {import('axios').AxiosInstance}
 */
const axiosInstance = axios.create({
  baseURL: `${service.API}`,
  headers: headersReg,
});

/**
 * Generates an error message from various error response structures.
 * @param {Object} error - The error object from the API response.
 * @returns {string} The formatted error message.
 */
const generateErrorMessage = (error) => {
  let message = "Something went wrong";
  if (error?.response?.data?.message) {
    message = error?.response?.data?.message;
  } else if (error?.response?.data?.error?.message) {
    message = error?.response?.error?.message;
  } else if (error?.data?.message) {
    message = error?.data?.message;
  } else if (error?.data?.error?.message) {
    message = error?.data?.error?.message;
  }
  return message;
};

/**
 * Request interceptor to add authorization token to requests.
 * @param {import('axios').AxiosRequestConfig} config - The request configuration.
 * @returns {import('axios').AxiosRequestConfig} The modified request configuration.
 */
const requestInterceptor = (config) => {
  const { token } = useStore.getState();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

/**
 * Response interceptor to handle successful responses.
 * @param {import('axios').AxiosResponse} response - The API response.
 * @returns {import('axios').AxiosResponse|Promise<never>} The response or a rejected promise.
 */
const responseInterceptor = (response) => {
  if (response?.status !== 200 && response?.status !== 201) {
    if ("error" in response?.data && !isEmpty(response?.data?.error)) {
      toast.error(generateErrorMessage(response));
      return Promise.reject(response);
    }
  }
  return response;
};

/**
 * Error interceptor to handle failed responses.
 * @param {import('axios').AxiosError} error - The error from the API response.
 * @returns {Promise<never>} A rejected promise with the error.
 */
const errorInterceptor = (error) => {
  const { setToken, setUser } = useStore.getState();
  if (error?.response?.status === 401) {
    setToken(null);
    setUser(null);
    window.location.href = "/authorize";
  }
  if (!error?.response?.data?.message?.data) {
    if (
      error?.response?.data?.message.includes("session not found") ||
      error?.response?.data?.message.includes("Session data user not found") ||
      error?.response?.data?.message.includes("jwt expired") ||
      error?.response?.data?.message.includes("Invalid token") ||
      error?.response?.data?.message.includes("destroy") ||
      error?.response?.data?.message.includes("JsonWebTokenError")
    ) {
      setToken(null);
      setUser(null);
      Cookies.remove(import.meta.env.VITE_COOKIE_SESSION_NAME, {
        domain: import.meta.env.VITE_SUB_DOMAIN,
      });
      Cookies.remove(import.meta.env.VITE_COOKIE_EMAIL_NAME, {
        domain: import.meta.env.VITE_SUB_DOMAIN,
      });
    }
  }

  if (axios.isCancel(error)) {
    return;
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
axiosInstance.interceptors.request.use(requestInterceptor);

export default axiosInstance;
