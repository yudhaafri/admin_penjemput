import classNames from "classnames";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

const RadioForm = ({
  name,
  fields,
  direction = "col",
  isLoading = false,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <Fragment>
          {isLoading ? (
            <Skeleton height={40} className="-mt-10" />
          ) : (
            <div
              className={classNames("flex", {
                "flex-row gap-4": direction === "row",
                "flex-col gap-2": direction === "col",
              })}
            >
              {fields?.map((field, idx) => (
                <div className="flex items-center gap-2" key={idx}>
                  <input
                    {...props}
                    id={field.id}
                    type="radio"
                    className={classNames(
                      "outline-none accent-primary-500 size-4",
                      {
                        "cursor-pointer": !props.disabled,
                        "cursor-default": props.disabled,
                      }
                    )}
                    checked={value === field.id}
                    onChange={() => onChange(field.id)}
                  />
                  <label
                    htmlFor={field.id}
                    className={classNames("text-sm text-slate-700", {
                      "cursor-pointer": !props.disabled,
                      "cursor-default": props.disabled,
                    })}
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          )}
          {invalid && (
            <div className={"text-xs text-red-600"}>{error?.message}</div>
          )}
        </Fragment>
      )}
    />
  );
};

export default RadioForm;
