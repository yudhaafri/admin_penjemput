import classNames from "classnames";
import Button from "..";

const SecondaryButton = ({
  children,
  outline = false,
  className = "",
  ...props
}) => {
  return (
    <Button
      className={classNames([
        {
          "border border-gray-400 bg-gray-400 text-white rounded": !outline,
        },
        { "border border-gray-400 text-gray-400 rounded": outline },
        ...className.split(" "),
      ])}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
