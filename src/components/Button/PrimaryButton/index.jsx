import classNames from "classnames";
import Button from "..";

const PrimaryButton = ({
  children,
  outline = false,
  className = "",
  ...props
}) => {
  return (
    <Button
      className={classNames([
        {
          "border border-blue-500 bg-blue-500 text-white rounded": !outline,
        },
        { "border border-blue-500 text-blue-500 rounded": outline },
        ...className.split(" "),
      ])}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
