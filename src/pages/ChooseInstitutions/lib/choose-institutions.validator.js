import * as yup from "yup";

const CHOOSE_INSTITUTIONS_SCHEMA = () => {
  let schema = yup.object({
    school: yup.mixed().required("Sekolah wajib diisi"),
  });

  return schema;
};

export default CHOOSE_INSTITUTIONS_SCHEMA;
