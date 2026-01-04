import Cookies from "js-cookie";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Layout } from "src/components";
import ChooseInstitutions from "src/pages/ChooseInstitutions";
import useStore from "src/stores";

const hasPermission = (permissions, middleware) => {
  if (!permissions || !middleware || middleware.length === 0) return true;
  return middleware.every(({ module, actions }) => {
    const modulePerms = permissions[module];
    if (!modulePerms) {
      console.warn(`Module "${module}" not found in permissions`);
      return false;
    }

    const missing = actions.filter((action) => !modulePerms[action]);
    if (missing.length > 0) {
      console.warn(`Missing permissions for "${module}":`, missing);
      return false;
    }

    return true;
  });
};

const ProtectRoute = ({ layout = true, middleware, children, fullHeight }) => {
  let { token, user, permissions } = useStore(
    ({ token, user, userSchool, permissions }) => ({
      token,
      user,
      userSchool,
      permissions,
    })
  );

  let session = Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME);

  let location = useLocation();

  const isAuthorized = hasPermission(permissions, middleware);

  if (!isAuthorized) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p>You have no permission!</p>
        <Link to={"/"} className="text-blue-500 hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  if (!token || !session) {
    return <Navigate to="/authorize" state={{ from: location }} replace />;
  }

  if (user?.foundations?.length > 1) {
    return <ChooseInstitutions />;
  }

  if (layout) {
    return <Layout fullHeight={fullHeight}>{children}</Layout>;
  }

  return children;
};

export default ProtectRoute;
