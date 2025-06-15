import classNames from "classnames";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FiInfo } from "react-icons/fi";
import { ReactPortal } from "src/components";

const InformationModal = ({
  isOpen,
  handleClose,
  title = "Informasi",
  children,
  size = "md",
  withHeader = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="react-portal-confirmation-modal-container">
      <div
        className={`flex items-center justify-center fixed inset-0 w-screen h-screen bg-black/70 z-[25] transition-opacity duration-300 ${
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
            size === "lg" && "w-8/12",
            size === "md" && "w-1/2",
            size === "sm" && "w-1/3",
          ])}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-4 gap-4">
            {withHeader && (
              <div className="flex-1 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <FiInfo className="text-xl" />
                  <span className="font-medium text-lg">{title}</span>
                </div>
                <CgClose
                  className="text-xl cursor-pointer hover:text-red-500"
                  onClick={handleClose}
                />
              </div>
            )}
            <div className="flex-1 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default InformationModal;
