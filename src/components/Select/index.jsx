import { useCallback } from "react";
import ReactSelect from "react-select";
import CreatableSelect from 'react-select/creatable';

const Select = ({
  placeholder,
  label,
  isRequired = false,
  note = "",
  invalid,
  disabled = false,
  options,
  isCreatable,
  withoutPrefix = false,
  ...props
}) => {
  const getStyles = useCallback(() => ({
    control: (state) => ({
      ...state,
      borderColor: invalid ? "#F04438" : "#e5e7eb",
      boxShadow: state.isFocused ? 0 : 0,
      "&:focus": {
        borderColor: invalid ? "#F04438" : "#80bdff",
      },
      "&:hover": {
        borderColor: invalid ? "#F04438" : "#e5e7eb",
      },
    }),
    option: (state, { isSelected, isFocused, isDisabled }) => ({
      ...state,
      color: isDisabled ? "gray" : "black",
      fontSize: 14,
      backgroundColor: isFocused
        ? "#dee6ed"
        : isSelected
          ? "#dee6ed"
          : state.backgroundColor,
      "&:hover": {
        backgroundColor: !isDisabled && "#dee6ed",
      },
    }),
  }));

  return (
    <div>
      {label && (
        <label>
          <span htmlFor="" className="text-slate-700 text-sm font-medium my-2">
            {label}
          </span>
          {isRequired && <span className="text-[#F04438] mr-1">{"*"}</span>}
          {note && (
            <span className="font-normal text-xs text-gray-400">
              <em>{`${note}`}</em>
            </span>
          )}
        </label>
      )}
      {isCreatable ? (
        <CreatableSelect  
          {...props}
          placeholder={placeholder}
          isDisabled={disabled}
          options={options}
          className="text-sm"
          styles={getStyles()}
          classNamePrefix="menu-dropdown"
          isClearable
          id={props.id}
        />
      ) : (
        <ReactSelect
          {...props}
          placeholder={placeholder}
          isDisabled={disabled}
          options={options}
          className="text-sm"
          styles={getStyles()}
          classNamePrefix={withoutPrefix ? "" : "menu-dropdown"}
        />
      )}
    </div>
  );
};

export default Select;
