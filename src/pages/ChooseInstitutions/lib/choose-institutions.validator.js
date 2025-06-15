import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const CHOOSE_INSTITUTIONS_SCHEMA = yupResolver(
  yup.object({
    foundation: yup.object().required().typeError("Harap pilih salah satu"),
  }),
);
