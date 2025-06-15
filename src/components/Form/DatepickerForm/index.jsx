import classNames from "classnames";
import { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { id } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const DatepickerForm = ({
  name,
  placeholder,
  disabled = false,
  label,
  isRequired,
  className = "",
  isYear,
  isRange,
  isTime,
  minDate = "",
  maxDate = "",
  onValueChanged = () => null,
  startDate: initialStartDate, // Destructure startDate from props
  endDate: initialEndDate, // Destructure endDate from props
  ...props
}) => {
  const datePickerRef = useRef();
  const { control, trigger } = useFormContext();

  const [startDate, setStartDate] = useState(initialStartDate || null); // Initialize state with props if they exist
  const [endDate, setEndDate] = useState(initialEndDate || null);

  // Effect to update state when props change
  useEffect(() => {
    setStartDate(initialStartDate || null);
    setEndDate(initialEndDate || null);
  }, [initialStartDate, initialEndDate]);

  const handleOnChange = (value, onChange) => {
    if (onValueChanged && typeof onValueChanged === "function") {
      onValueChanged(value);
    }
    onChange(value);
    trigger();
  };

  const handleOnChangeRange = (dates, onChange) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    onChange(dates);
  };

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
          {label && (
            <label>
              <span className={`text-sm text-slate-700 font-medium mr-1`}>
                {label}
              </span>
              {isRequired && <span className="text-[#F04438] mr-1">{"*"}</span>}
            </label>
          )}
          <div
            className={classNames([
              "border rounded overflow-hidden flex items-center",
              { "bg-gray-100": props.disabled },
              ...className.split(" "),
            ])}
          >
            {isYear ? (
              <DatePicker
                selected={value}
                onChange={(value) => handleOnChange(value, onChange)}
                wrapperClassName={classNames([
                  "outline-none w-full p-2 text-sm text-gray-500 cursor-pointer disabled:bg-transparent",
                  { "border-red-600": invalid },
                ])}
                className={classNames([
                  "outline-none w-full text-sm cursor-pointer disabled:bg-transparent",
                ])}
                dateFormat="yyyy"
                showYearPicker
                yearItemNumber={15}
                isClearable
                placeholderText={placeholder}
                disabled={disabled}
              />
            ) : isRange ? (
              <DatePicker
                selected={startDate} // Set the selected start date
                onChange={(value) => handleOnChangeRange(value, onChange)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                wrapperClassName={classNames([
                  "outline-none w-full p-2 text-sm text-gray-500 cursor-pointer disabled:bg-transparent",
                  { "border-red-600": invalid },
                ])}
                className={classNames([
                  "flex items-center space-y-1 p-2 outline-none w-full text-sm cursor-pointer disabled:bg-transparent",
                  `${disabled ? "bg-transparent" : "bg-white"}`,
                  { "border border-red-600 rounded": invalid },
                ])}
                isClearable={startDate && endDate}
                placeholderText={placeholder}
                disabled={disabled}
              />
            ) : isTime ? (
              <DatePicker
                selected={value}
                onChange={(value) => handleOnChange(value, onChange)}
                wrapperClassName={classNames([
                  "outline-none w-full p-2 text-sm text-gray-500 cursor-pointer disabled:bg-transparent",
                  { "border-red-600": invalid },
                ])}
                className={classNames([
                  "flex items-center space-y-1 p-2 outline-none w-full text-sm cursor-pointer disabled:bg-transparent",
                  `${disabled ? "bg-transparent" : "bg-white"}`,
                  { "border border-red-600 rounded": invalid },
                ])}
                dateFormat="dd/MM/yyyy - HH:mm"
                showTimeInput
                minDate={minDate}
                maxDate={maxDate}
                locale={id}
                timeInputLabel="Jam:"
                isClearable={value}
                placeholderText={placeholder}
                disabled={disabled}
              />
            ) : (
              <div
                className={classNames([
                  "flex items-center w-full space-y-1 p-2 cursor-pointer disabled:bg-transparent",
                  `${disabled ? "bg-transparent" : "bg-white"}`,
                ])}
                onClick={() => datePickerRef?.current?.showPicker()}
              >
                <input
                  ref={datePickerRef}
                  type="date"
                  className={classNames([
                    "outline-none w-full text-sm text-gray-500 cursor-pointer",
                    `${disabled ? "bg-transparent" : "bg-white"}`,
                    { "border-red-600": invalid },
                  ])}
                  value={value}
                  min={minDate}
                  max={maxDate}
                  {...props}
                  onChange={(event) =>
                    handleOnChange(event?.target?.value, onChange)
                  }
                  disabled={disabled}
                />
              </div>
            )}
          </div>
          {invalid && (
            <div className="mt-1 text-red-600 text-xs">{error?.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default DatepickerForm;
