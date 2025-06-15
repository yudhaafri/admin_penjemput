import classNames from "classnames";
import { CgSpinner } from "react-icons/cg";

const Spinner = ({ className = "" }) => {
  return (
    <CgSpinner
      className={classNames(["animate-spin text-4xl", ...className.split(" ")])}
    />
  );
};

export default Spinner;
