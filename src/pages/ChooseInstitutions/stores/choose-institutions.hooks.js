import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useStore from "src/stores";
import {
  useGetAccessToken,
  useSchoolOrgChoose,
  useSchoolOrgsQuery,
} from "src/hooks/services/useSchool";
import CHOOSE_INSTITUTIONS_SCHEMA from "../lib/choose-institutions.validator";
import { jwtDecode } from "jwt-decode";

const useChooseInstitutionsHooks = () => {
  let { setToken, setUser, setUserSchool, session, setRoles } = useStore((state) => ({
    setToken: state.setToken,
    setUser: state.setUser,
    setUserSchool: state.setUserSchool,
    session: state.session,
    setRoles: state.setRoles
  }));

  const { data, isFetching } = useSchoolOrgsQuery();
  const post = useSchoolOrgChoose();
  const getAccessToken = useGetAccessToken();

  const schema = CHOOSE_INSTITUTIONS_SCHEMA();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      school: null,
    },
  });

  const handleSubmit = (payload) => {
    const params = {
      session_key: session,
      module: import.meta.env.VITE_MODULE_TYPE,
      class_year: data?.classYear,
      institution: data?.institution,
      employee: data?.employee,
      foundation: payload?.school,
    };
    if (data) {
      post.mutate(params, {
        onSuccess: () => {
          getAccessToken.mutate(
            { session_key: session, module: import.meta.env.VITE_MODULE_TYPE },
            {
              onSuccess: (response) => {
                const token = response?.data?.data?.token ?? null;
                const roles = response?.data?.data?.roles ?? null;
                let user = response?.data?.data;               
                delete user.token;
                const userData = jwtDecode(token);
                setToken(token);
                setRoles(roles)
                setUser(user);
                setUserSchool(userData?.pickedFoundation);
                toast.success(response?.data?.message);
              },
            }
          );
        },
      });
    }
  };
  return {
    setToken,
    setUser,
    setUserSchool,
    methods,
    handleSubmit,
    data,
    isFetching,
  };
};

export default useChooseInstitutionsHooks;
