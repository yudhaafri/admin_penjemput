import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "src/components";
import useStore from "src/stores";

const LogoutCallback = () => {
  const session_key = Cookies.get("session");
  const navigate = useNavigate();

  const { reset } = useStore((state) => ({
    reset: state.reset,
  }));


  useEffect(() => {
    if (session_key) {
      logout.mutate(
        { session_key, module: import.meta.env.VITE_MODULE_TYPE },
        {
          onSuccess: () => {
            reset();
            setTimeout(() => {
              if (import.meta.env.VITE_ENV !== "LOCAL") {
                window.location.href = import.meta.env.VITE_IDENTITY_SERVER_URL;
              } else {
                navigate("/authorize");
              }
            }, 1000);
          },
        }
      );

      return;
    }

    if (import.meta.env.VITE_ENV !== "LOCAL") {
      window.location.href = import.meta.env.VITE_IDENTITY_SERVER_URL;
    } else {
      reset();
      navigate("/authorize");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default LogoutCallback;
