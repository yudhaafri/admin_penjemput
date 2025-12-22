import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import useStore from "src/stores";

const AuthRoute = ({ children }) => {
  let { token, session } = useStore((state) => ({
    token: state.token,
    session: state.session,
  }));

  let location = useLocation();

  const sessionCookie = Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME);
  const emailCookie = Cookies.get(import.meta.env.VITE_COOKIE_EMAIL_NAME);

  if (!session || !sessionCookie || !emailCookie) {
    window.location.href = import.meta.env.VITE_IDENTITY_SERVER_URL;
  }

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthRoute;
