import { MdKeyboardArrowLeft } from "react-icons/md";

const ModulePermissionNotFoundPage = () => {
  return (
    <div
      className={
        "w-screen h-screen flex flex-col gap-5 justify-center items-center bg-slate-100"
      }
    >
      <div className={"flex h-fit gap-3 items-center"}>
        <img src="/assets/logo-bpk.png" alt="" width={60} />
        <div
          className={
            "border-l-4 pl-3 border-slate-700/50 flex flex-col justify-start gap-5"
          }
        >
          <div>
            <p className={"text-slate-700 font-semibold"}>Forbidden</p>
            <p className={"font-light italic text-xs"}>
              You have no permission to access this module
            </p>
          </div>
          <button
            className={
              "text-slate-700 text-sm w-fit underline flex items-center gap-2"
            }
            onClick={() => {
              window.location.href = import.meta.env.VITE_IDENTITY_SERVER_URL;
            }}
          >
            <MdKeyboardArrowLeft />
            Go to Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModulePermissionNotFoundPage;
