/**
 * Service configuration object.
 * @typedef {Object} ServiceConfig
 * @property {string} API_BASE - The base URL for the main API.
 * @property {string} API_IDENTITY - The base URL for the identity server backend API.
 */

/**
 * Service configuration containing API endpoints.
 * @type {ServiceConfig}
 */
const service = {
  API_BASE: import.meta.env.VITE_API_BASE_URL,
  API_IDENTITY: import.meta.env.VITE_API_IDENTITY_URL,
};

export default service;  