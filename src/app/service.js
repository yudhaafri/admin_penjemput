/**
 * Service configuration object.
 * @typedef {Object} ServiceConfig
 * @property {string} API - The base URL for the main API.
 * @property {string} STUDENT_ADMIN_API - The base URL for the student admin API.
 * @property {string} BE_IDENTITY_API - The base URL for the identity server backend API.
 * @property {string} BE_INTEGRATION_API - The base URL for the BE Integration API.
 * @property {string} BE_INTEGRATION_API_KEY - The API Key for the BE Integration API.
 * @property {string} BE_PSB_API - The base URL for the BE PSB API.
 * @property {string} BE_PSB_API_KEY - The API Key for the BE PSB API.
 */

/**
 * Service configuration containing API endpoints.
 * @type {ServiceConfig}
 */
const service = {
  API: import.meta.env.VITE_API_BASE_URL,
  STUDENT_ADMIN_API: import.meta.env.VITE_API_STUDENT_ADMIN_BASE_URL,
  BE_IDENTITY_API: import.meta.env.VITE_IDENTITY_API_URL,
  BE_INTEGRATION_API: import.meta.env.VITE_API_BE_INTEGRATION_BASE_URL,
  BE_INTEGRATION_API_KEY: import.meta.env.VITE_BE_INTEGRATION_API_KEY,
  BE_PSB_API: import.meta.env.VITE_API_BE_PSB_BASE_URL,
  BE_PSB_API_KEY: import.meta.env.VITE_BE_PSB_API_KEY,
};

export default service;  