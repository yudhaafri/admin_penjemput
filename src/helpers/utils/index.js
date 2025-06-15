/**
 * Utility functions for various operations.
 * @module utils
 */

import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useStore from "src/stores";

/**
 * Creates a wrapper div element and appends it to the body.
 *
 * @param {string} wrapperId - The ID to be assigned to the wrapper element.
 * @returns {HTMLElement} The created wrapper element.
 */
export const createWrapperAndAppendToBody = (wrapperId) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

/**
 * Formats a number as Indonesian Rupiah currency.
 *
 * @param {number} amount - The amount to be formatted.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, style = "currency") => {
  return new Intl.NumberFormat("id-ID", {
    style: style,
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Removes currency formatting from a string value.
 *
 * @param {string} value - The formatted currency string.
 * @returns {string} The cleaned numeric string without currency symbols and separators.
 */
export const removeFormatCurrency = (value) => {
  return value.replace("Rp", "").trim().replace(/\./g, "");
};

/**
 * Copies the provided text to the clipboard and shows a success message.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.text - The text to be copied to the clipboard.
 * @param {string} params.message - The message to be displayed upon successful copy.
 * @returns {Promise<void>} A promise that resolves when the text has been copied.
 */
export const copyToClipboard = ({ text, message }) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(message);
    })
    .catch((error) => {
      console.error("Gagal menyalin: ", error);
    });
};

export const getParams = (parameter) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get(parameter);
};

export const HasAccess = ({ module, action, children }) => {
  const { permissions } = useStore((state) => ({
    permissions: state.permissions,
  }));

  const canAccess = permissions?.[module]?.[action];
  return canAccess ? children : null;
};
