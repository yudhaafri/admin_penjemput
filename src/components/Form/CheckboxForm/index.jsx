import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

const CheckboxForm = ({ name, fields, direction = "col", isLoading = false, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <div
          className={classNames("flex", {
            "flex-row gap-4": direction === "row",
            "flex-col gap-2": direction === "col",
          })}
        >
          {isLoading ? (
            <Skeleton width={"25%"} />
          ) : (
            <>
              {fields?.map((field, idx) => (
                <div className="flex items-center gap-2" key={idx}>
                  <input
                    {...props}
                    id={field.id}
                    type="checkbox"
                    className={classNames(
                      "outline-none accent-primary-500 size-4",
                      {
                        "cursor-pointer": !props.disabled,
                        "cursor-default": props.disabled,
                      }
                    )}
                    checked={value.includes(field.id)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const newValue = isChecked
                        ? [...value, field.id]
                        : value.filter((id) => id !== field.id);
                      onChange(newValue);
                    }}
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
            </>
          )}
          {invalid && (
            <div className={"text-xs text-red-600"}>{error?.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default CheckboxForm;
