import classNames from "classnames";
import { useEffect } from "react";
import { CgClose, CgSpinner } from "react-icons/cg";
import { Button, ReactPortal } from "src/components";

const FormModal = ({
  children,
  isOpen,
  handleClose,
  isLoading,
  onSubmit,
  title = "",
  size = "md",
  withoutSubmitBtn = false,
  withoutCloseBtn = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="react-portal-form-modal-container">
      <div
        className={`flex items-center justify-center fixed inset-0 w-screen h-screen bg-black/70 z-[25] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      >
        <div
          key="modal-confirmation"
          className={classNames([
            "max-h-[90%] bg-white rounded-xl transform transition-transform duration-500",
            size === "2xl" && "w-[90%]",
            size === "xl" && "w-10/12",
            size === "md" && "w-1/2",
            size === "sm" && "w-1/3",
          ])}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-4 space-y-8">
            <div className="flex-1 flex items-center justify-between">
              <p className="text-lg font-medium">{title}</p>
              <CgClose
                className="text-xl cursor-pointer hover:text-red-500"
                onClick={handleClose}
              />
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {children}
            </div>
            <div className="flex-1 flex items-center space-x-4">
              {!withoutCloseBtn && (
                <Button
                  type="button"
                  className="text-gray-700 border-gray-300 bg-white hover:bg-gray-100 flex-1 py-2"
                  disabled={isLoading}
                  onClick={handleClose}
                >
                  Batal
                </Button>
              )}
              {!withoutSubmitBtn && (
                <Button
                  type="button"
                  className="flex items-center justify-center gap-1 text-white border-gray-600 bg-gray-600 hover:bg-gray-700 hover:border-gray-700 flex-1 py-2 space-x-1"
                  disabled={isLoading}
                  onClick={onSubmit}
                >
                  {isLoading && <CgSpinner className="animate-spin" />}
                  <span>Kirim</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default FormModal;
