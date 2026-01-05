import React, { forwardRef } from "react";
import classNames from "classnames";
import useStore from "src/stores";

const NfcCardPrint = forwardRef(({ student }, ref) => {
  let { userSchool, level } = useStore(({ userSchool, level }) => ({
    userSchool,
    level,
  }));
  return (
    <div className="hidden">
      <div
        ref={ref}
        className={classNames([
          "relative nfc-card box-border rounded-[3mm] font-sans",
          { "text-black": level !== "SD" },
          { "text-white": level === "SD" },
        ])}
      >
        <img
          src={level === "SD" ? "/assets/bg-sd.png" : "/assets/bg-tk.png"}
          alt="student"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[5px] left-[44px]">
          <p className="text-[18px] font-bold">Kartu Penjemput</p>
          <p className="text-[14px] font-bold">{userSchool?.foundationName}</p>
        </div>
        <div className="absolute top-[55px] left-[32px] border-2 border-[#5672B7] rounded w-[72px] h-[108px] overflow-hidden">
          <img
            src={student?.path_image ?? "/assets/default-profile.png"}
            alt="student"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute left-[20px] bottom-[5px]">
          <div className="flex items-end gap-3">
            <p className="text-[12px] font-bold">{student?.nsp}</p>
            <p className="text-[9px] font-bold">Gol.Darah: B</p>
          </div>
          <p className="text-[10px] font-semibold">{student?.full_name}</p>
        </div>
      </div>
    </div>
  );
});

export default NfcCardPrint;
