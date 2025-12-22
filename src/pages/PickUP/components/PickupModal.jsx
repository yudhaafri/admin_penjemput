import classNames from "classnames";
import { useEffect, useState } from "react";
import { ReactPortal } from "src/components";
import { AUTO_CLOSE_SECONDS, TYPE_SHUTTLE } from "../lib/pickup.constants";

const PickupModal = ({ isOpen, handleClose, data }) => {
  const [counter, setCounter] = useState(AUTO_CLOSE_SECONDS);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Reset counter
  useEffect(() => {
    if (isOpen) setCounter(AUTO_CLOSE_SECONDS);
  }, [isOpen]);

  // Countdown
  useEffect(() => {
    if (!isOpen) return;

    if (counter <= 0) {
      handleClose();
      setTimeout(() => {
        setCounter(AUTO_CLOSE_SECONDS);
      }, 1000);
      return;
    }

    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter, isOpen, handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-form-modal-container">
      <div
        className={`fixed inset-0 z-[25] flex flex-col items-center justify-center bg-black/70 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onMouseDown={handleClose}
      >
        {/* Modal Box */}
        <div
          className={classNames(
            "bg-white rounded-xl w-[900px] max-h-[600px] p-6"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Informasi Siswa */}
            <div className="bg-modal-pickup flex flex-col space-y-4">
              <p className="text-lg font-medium text-center">Informasi Siswa</p>

              <img
                src={data?.image_student ?? "/assets/default-profile.png"}
                alt="student"
                className="mx-auto w-[240px] h-[300px] object-contain"
              />

              <div className="text-center space-y-1">
                <p className="font-medium">{data?.student_name}</p>
                <p className="text-sm text-gray-500">
                  Kelas: {data?.class_student ?? "-"}
                </p>
              </div>
            </div>

            {/* Informasi Penjemput */}
            <div className="bg-modal-pickup flex flex-col space-y-4">
              <p className="text-lg font-medium text-center">
                Informasi Penjemput
              </p>

              {data?.type == TYPE_SHUTTLE.TAPPING ? (
                <>
                  <img
                    src={"/assets/tapping-banner.svg"}
                    alt="driver"
                    className="mx-auto w-[240px] h-[300px] object-contain"
                  />

                  <div className="text-center font-medium">
                    Diakses melalui Kartu Penjemput
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={data?.image_driver ?? "/assets/default-profile.png"}
                    alt="driver"
                    className="mx-auto w-[240px] h-[300px] object-contain"
                  />
                  <div className="text-center font-medium">
                    {data?.driver_name}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Counter text */}
        <p className="mt-4 text-sm text-white/80 text-center">
          Klik di area mana saja untuk menutup, atau tunggu {counter} detik
        </p>
      </div>
    </ReactPortal>
  );
};

export default PickupModal;
