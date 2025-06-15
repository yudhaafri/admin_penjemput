import classNames from "classnames";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { Select } from "src/components";

const SelectForm = ({
  name,
  className = "",
  label,
  options,
  placeholder,
  onValueChanged,
  isCreatable = false,
  required = false,
  ...props
}) => {
  const {
    control,
    setFocus,
    formState: { errors },
  } = useFormContext();

  const handleOnChange = (value, onChange) => {
    if (onValueChanged && typeof onValueChanged === "function") {
      onValueChanged(value);
    }
    onChange(value);
  };

  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      setTimeout(() => {
        setFocus(firstErrorField);
        // Target the wrapper div of the react-select component using id
        const element = document.getElementById(
          `menu-dropdown-${firstErrorField}`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Add focus to the input element inside the wrapper
          // const inputElement = element.querySelector("input");
          // if (inputElement) {
          //   inputElement.focus();
          // }
        } else {
          console.error(`Element not found for: ${firstErrorField}`);
        }
      }, 0);
    }
  }, [errors, setFocus]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <div className="space-y-1">
          {label ? props?.isLoadingContent ? (
            <Skeleton width={80} />
          ) : (
            <>
              <label className="block text-sm text-slate-700 font-medium">
                {label}
                {required && <span className="text-red-600">*</span>}
              </label>
            </>
          ) : null}
          {props?.isLoadingContent ? (
            <Skeleton height={40} />
          ) : (
            <Select
              {...props}
              name={name}
              placeholder={placeholder}
              onChange={(value) => handleOnChange(value, onChange)}
              value={value}
              options={options}
              invalid={invalid}
              isCreatable={isCreatable}
              className={classNames([
                { "border-red-600": invalid },
                ...className?.split(" "),
              ])}
              id={`menu-dropdown-${name}`}
            />
          )}
          {invalid && (
            <div className="text-xs text-red-600">{error?.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default React.memo(SelectForm);
