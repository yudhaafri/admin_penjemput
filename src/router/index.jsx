import { map } from "lodash";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginCallback from "src/pages/Auth/callback/login-callback.page";
import LogoutCallback from "src/pages/Auth/callback/logout-callback.page";
import ProtectRoute from "./protect";
import routes from "./routes";
import AuthRoute from "./auth";
import ChooseInstitutions from "src/pages/ChooseInstitutions";
import ModulePermissionNotFoundPage from "src/pages/Auth/guard/module-permission-not-found";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authorize" element={<LoginCallback />} />
        <Route path="/forbidden" element={<ModulePermissionNotFoundPage />} />
        <Route path="/logout" element={<LogoutCallback />} />
        <Route
          path="/pilih-sekolah"
          element={
            <AuthRoute>
              <ChooseInstitutions />
            </AuthRoute>
          }
        />
        {map(routes, (route, key) => {
          const { component: Component } = route;
          return (
            <Route
              key={key}
              path={route.path}
              element={
                <ProtectRoute
                  middleware={route.middleware}
                  layout={route?.layout}
                  fullHeight={route?.fullHeight}
                >
                  <Component />
                </ProtectRoute>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
