import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { forwardRef } from "react";

// Wrap NumericFormat with forwardRef
const NumericFormatWrapper = forwardRef((props, ref) => {
  return <NumericFormat {...props} getInputRef={ref} />;
});

NumericFormatWrapper.displayName = 'NumericFormatWrapper';

const NumberFormatForm = ({ name, label, className = "", required = false, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { invalid, error } }) => (
        <div>
          <label htmlFor="" className="text-slate-700 text-sm font-medium my-2">
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
          <NumericFormatWrapper
            {...field}
            {...props}
            className={classNames(
              "outline-none p-2 w-full text-sm disabled:bg-transparent border rounded overflow-hidden flex items-center bg-white",
              { "border-red-600": invalid },
              { "!bg-[#f2f2f2] text-[#adabaa]": props.disabled},
              ...className?.split(" ")
            )}
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            placeholder="Rp. xxx.xxx"
            allowLeadingZeros
            isAllowed={(values) => {
              const { floatValue, formattedValue } = values;
              return floatValue === undefined || formattedValue.length <= 20; // Adjust max length as needed
            }}
            onValueChange={(values, sourceInfo) => {
              const { value } = values;
              if (sourceInfo.source === "event") {
                // Only update on user input, not on formatting
                const numericValue = value.replace(/\./g, '').replace(/Rp\s/g, '');
                field.onChange(numericValue);
              }
            }}
            value={field.value}
          />
          <div className={"text-xs text-red-600"}>{error?.message}</div>
        </div>
      )}
    />
  );
};

export default NumberFormatForm;