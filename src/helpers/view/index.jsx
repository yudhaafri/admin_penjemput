import classNames from "classnames";

export const renderStatus = (status) => {
  return (
    <span
      className={classNames(
        "flex flex-wrap w-fit text-xs items-center justify-center p-2 font-medium rounded-xl",
        {
          "text-red-500 bg-red-50":
            status === "BELUM LENGKAPI DATA" ||
            status === "DATA BELUM LENGKAP" ||
            status === "SUBMIT" ||
            status === "REJECTED" ||
            status === "DITOLAK" ||
            status === "BELUM LUNAS",
          "text-emerald-500 bg-emerald-50":
            status === "TEROTORISASI" ||
            status === "PERSETUJUAN HASIL RAPAT" ||
            status === "SUDAH LENGKAPI DATA" ||
            status === "DISETUJUI" ||
            status === "ACCEPTED" ||
            status === "DITERIMA" ||
            status === "LUNAS",
          "text-yellow-500 bg-yellow-50":
            status === "BATAL OTORISASI" ||
            status === "SAVE TU" ||
            status === "SCORING" ||
            status === "GRADING" ||
            status === "INPUT BAHAN RAPAT" ||
            status === "BAHAN RAPAT",
          "text-sky-500 bg-sky-50": status === "WAITING" || status === "DRAFT",
        }
      )}
    >
      {status}
    </span>
  );
};
