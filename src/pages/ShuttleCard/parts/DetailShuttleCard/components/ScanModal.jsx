import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, ReactPortal } from "src/components";
import useTappingHooks from "../stores/pickup-tapping.hooks";

const ScanModal = ({ isOpen, handleClose }) => {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const { connected } = useTappingHooks();

  return (
    <ReactPortal wrapperId="react-portal-form-modal-container">
      <div
        className={`fixed inset-0 z-[25] flex flex-col items-center justify-center bg-black/70 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Modal Box */}
        <div
          className={classNames(
            "bg-white rounded-xl w-[900px] max-h-[600px] p-6"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-modal-pickup flex flex-col space-y-4">
            <p className="text-lg font-medium text-center">
              {connected
                ? "Silahkan Tapping Kartu Yang Baru"
                : "Tapping Card belum terkoneksi atau bridge belum dijalankan"}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={handleClose}
              type="button"
              className="mt-2 text-white w-[140px] rounded-[10px] text-md font-bold border-primary-700 bg-primary-700 hover:bg-primatext-primary-700 hover:border-primatext-primary-700 flex-1 py-2 space-x-1"
            >
              <span>Batal</span>
            </Button>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default ScanModal;
