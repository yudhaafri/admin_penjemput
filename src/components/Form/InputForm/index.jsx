import classNames from "classnames";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { Input } from "src/components";

export default function InputForm({
  label,
  name,
  onValueChanged,
  className = "",
  required = false,
  isLoading = false,
  ...props
}) {
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
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
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
        <div>
          {label && <label htmlFor="" className="text-slate-700 text-sm font-medium my-2">
            {isLoading ? (
              <Skeleton width={80} />
            ) : (
              <>
                {label}
                {required && <span className="text-red-600">*</span>}
              </>
            )}
          </label>}
          {isLoading ? (
            <Skeleton height={40} />
          ) : (
            <Input
              {...props}
              name={name}
              onChange={(event) =>
                handleOnChange(event?.target?.value, onChange)
              }
              value={value}
              className={classNames([
                { "border-red-600": invalid },
                { "bg-[#f2f2f2] text-[#adabaa]": props.disabled },
                ...className?.split(" "),
              ])}
            />
          )}
          <div className={"text-xs text-red-600"}>{error?.message}</div>
        </div>
      )}
    />
  );
}
