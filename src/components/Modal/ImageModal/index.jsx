import classNames from "classnames";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import QuestionImage from "/assets/icon/question.svg";
import SuccessImage from "/assets/icon/success.svg";
import WarningImage from "/assets/icon/warning.svg";
import { Button, ReactPortal } from "src/components";

const ImageModal = ({
  isOpen,
  handleClose,
  isLoading,
  onSubmit,
  title = "",
  subtitle = "Apakah anda yakin?",
  description = "",
  variant = "question",
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
        className={`flex items-center overflow-y-scroll justify-center fixed inset-0 w-screen h-screen bg-black/70 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      >
        <div
          key="modal-confirmation"
          className={classNames([
            "bg-white flex items-center justify-center rounded-xl transform transition-transform duration-300 w-auto px-4",
          ])}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-center items-center p-4 py-8 space-y-8">
            <span className="text-lg font-bold text-primary-700">{title}</span>
            {variant === "question" ? (
              <img className="w-56" src={QuestionImage} alt="question" />
            ) : variant === "success" ? (
              <img className="w-62" src={SuccessImage} alt="success" />
            ) : (
              <img className="w-62" src={WarningImage} alt="warning" />
            )}
            <div className="flex flex-col justify-center items-center">
              <p className="flex-1 text-xl font-bold text-primary-700 space-y-1">
                {subtitle}
              </p>
              <p className="text-sm mt-2 max-w-[400px] text-center">
                {typeof description === "function"
                  ? description()
                  : description}
              </p>
            </div>
            {variant === "question" ? (
              <div className="flex-1 flex items-center space-x-6">
                <Button
                  type="button"
                  className="text-primary-700 w-[200px] rounded-[10px] text-sm font-bold border border-primary-700 bg-white hover:bg-gray-100 flex-1 py-2.5"
                  disabled={isLoading}
                  onClick={handleClose}
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  className="text-white  w-[200px] rounded-[10px] text-sm font-bold border-primary-700 bg-primary-700 hover:bg-primatext-primary-700 hover:border-primatext-primary-700 flex-1 py-2.5 space-x-1 flex items-center justify-center"
                  disabled={isLoading}
                  onClick={onSubmit}
                >
                  <span>Ya, Benar</span>
                  {isLoading && <CgSpinner className="animate-spin" />}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                className="text-white  w-[140px] rounded-[10px] text-sm font-bold border-primary-700 bg-primary-700 hover:bg-primatext-primary-700 hover:border-primatext-primary-700 flex-1 py-2.5 space-x-1"
                disabled={isLoading}
                onClick={onSubmit}
              >
                <span>Oke</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default ImageModal;
