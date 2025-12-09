import classNames from "classnames";
import { useEffect } from "react";
import { CgClose, CgSpinner } from "react-icons/cg";
import { Button, ReactPortal } from "src/components";

const PickupModal = ({ isOpen, handleClose, data }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="react-portal-form-modal-container">
      <div
        className={`flex items-center justify-center fixed inset-0 w-screen h-screen bg-black/70 z-[25] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onMouseDown={handleClose}
      >
        <div
          key="modal-confirmation"
          className={classNames([
            "max-h-[500px] bg-white rounded-xl transform transition-transform duration-500 w-[548px] p-[15px]",
          ])}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-modal-pickup flex flex-col p-4 space-y-8">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-lg font-medium">Informasi Penjemput</p>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              <img
                src={data?.student_image ?? "/assets/default-profile.png"}
                alt="qr-bg"
                className="mx-auto w-[300px] h-[360px] object-contain"
              />
              <div className="text-center font-medium">{data?.driver_name}</div>
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default PickupModal;
