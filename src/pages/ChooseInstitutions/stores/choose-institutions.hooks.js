import { useEffect, useMemo } from "react";
import {
  useChooseFoundation,
  useGetAccessToken,
} from "src/hooks/services/useAuth";
import { useEmployeeQuery } from "src/hooks/services/useMasterData";
import useStore from "src/stores";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const useChooseInstitutionsHooks = () => {
  const navigate = useNavigate();
  let { session, setToken, setUser, setRoles, setUserSchool, setPermissions } = useStore(
    ({
      session,
      setToken,
      setUser,
      setUserSchool,
      userSchool,
      setRoles,
      setPermissions,
    }) => ({
      session,
      setToken,
      setUser,
      setUserSchool,
      userSchool,
      setRoles,
      setPermissions,
    }),
  );

  const { data: employee, error } = useEmployeeQuery();
  const chooseFoundation = useChooseFoundation();
  const getAccessToken = useGetAccessToken();

  const schoolList = useMemo(() => {
    return employee?.data?.schoolList;
  }, [employee]);

  useEffect(() => {
    if (error?.response?.status === 403) {
      navigate("/forbidden");
    }
    if (error?.response?.status === 401) {
      window.location.href = import.meta.env.VITE_IDENTITY_SERVER_URL;
    }
  }, [error]);

  const handleSubmit = (data) => {
    const payload = {
      session_key: session,
      module: import.meta.env.VITE_MODULE_TYPE,
      class_year: employee?.data.classYear,
      institution: employee?.data.institution,
      employee: employee?.data.employee,
      foundation: data.foundation,
    };

    
    chooseFoundation.mutate(payload, {
      onSuccess: () => {
      getAccessToken.mutate(
          { session_key: session, module: import.meta.env.VITE_MODULE_TYPE },
          {
            onSuccess: async (response) => {
              const token = await response?.data?.data?.token;
              const roles = await response?.data?.data?.roles;
              const data = jwtDecode(token);
              const allPermissions = response?.data?.data?.permissions;
              // const allPermissions = [
              //   ...new Set(
              //     response.data.data?.roles.flatMap(
              //       (role) => role.permissions,
              //     ),
              //   ),
              // ];


              setToken(token);
              setUser(data);
              setRoles(roles)
              setUserSchool(data?.pickedFoundation);
              setPermissions(allPermissions);
              toast.success("Login Berhasil");
            },
          },
        );
      },
    });
  };

  return { handleSubmit, schoolList };
};

export default useChooseInstitutionsHooks;
