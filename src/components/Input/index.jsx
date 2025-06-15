import classNames from "classnames";

const Input = ({
  placeholder,
  preffixIcon,
  suffixIcon,
  className = "",
  label,
  isRequired = false,
  note = "",
  textArea = false,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label>
          <span className={`text-sm mr-1 font-bold`}>{label}</span>
          {isRequired && <span className="text-[#F04438] mr-1">{"*"}</span>}
          {note && (
            <span className="font-normal text-xs text-gray-400">
              <em>{`${note}`}</em>
            </span>
          )}
        </label>
      )}
      <div
        className={classNames([
          "border rounded overflow-hidden flex items-center",
          { "bg-[#f2f2f2]": props.disabled },
          ...className.split(" "),
        ])}
      >
        <div className="mr-2">{preffixIcon}</div>
        {textArea ? (
          <textarea
            {...props}
            placeholder={placeholder}
            className={classNames([
              "outline-none py-2 w-full text-sm disabled:bg-transparent min-h-20",
            ])}
          ></textarea>
        ) : (
          <input
            {...props}
            className={classNames([
              "outline-none py-2 w-full text-sm disabled:bg-transparent",
              { "file:bg-primary-500 file:text-white file:rounded-md file:p-1 file:text-xs cursor-pointer": props.type === "file"}
            ])}
            placeholder={placeholder}
          />
        )}
        <div className="mr-2">{suffixIcon}</div>
      </div>
    </div>
  );
};

export default Input;
