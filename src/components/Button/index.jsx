import classNames from "classnames";
import { Tooltip } from "react-tooltip";

const Button = ({
  children,
  className = "",
  disabled = false,
  idTooltip,
  tooltip,
  ...props
}) => {
  const handleClick = () => {
    // Lakukan sesuatu
    props.onClick && props.onClick();

    // Hilangkan fokus agar barcode scanner tidak men-trigger tombol lagi
    setTimeout(() => {
      document.activeElement instanceof HTMLElement &&
        document.activeElement.blur();
    }, 0);
  };

  return (
    <>
      <button
        {...props}
        data-tooltip-id={idTooltip}
        disabled={disabled}
        className={classNames([
          "p-1 text-sm",
          "rounded drop-shadow",
          "[&>*]:enabled:hover:cursor-pointer enabled:hover:brightness-90",
          // "enabled:transition-transform enabled:hover:scale-105",
          "disabled:opacity-70 disabled:cursor-not-allowed [&>*]:disabled:cursor-not-allowed",
          ...className.split(" "),
        ])}
        onClick={handleClick}
      >
        {children}
      </button>

      {tooltip && idTooltip && (
        <Tooltip id={idTooltip} className="z-10" style={{ marginLeft: "0px" }}>
          <p>{tooltip}</p>
        </Tooltip>
      )}
    </>
  );
};

export default Button;
