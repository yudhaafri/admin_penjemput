import Cookies from "js-cookie";
import { useEffect } from "react";
import { Spinner } from "src/components";
import { useLogout } from "src/hooks/services/useAuth";
import useStore from "src/stores";

const LogoutCallback = () => {
  const session_key = Cookies.get("session");

  const { reset } = useStore((state) => ({
    reset: state.reset,
  }));

  const logout = useLogout();

  useEffect(() => {
    if (session_key) {
      logout.mutate(
        { session_key, module: import.meta.env.VITE_MODULE_TYPE },
        {
          onSuccess: () => {
            reset();
            setTimeout(() => {
              window.location.href = import.meta.env.VITE_IDENTITY_SERVER_URL;
            }, 1000);
          },
        }
      );

      return;
    }

    window.location.href = import.meta.env.VITE_IDENTITY_SERVER_URL;
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default LogoutCallback;
