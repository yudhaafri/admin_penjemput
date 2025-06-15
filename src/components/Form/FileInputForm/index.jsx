import classNames from "classnames";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { FaRegFileImage } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { Button } from "src/components";

export default function FileInputForm({
  label,
  name,
  className = "",
  onValueChanged,
  accept = "image/*, .doc, .xlsx, .pdf",
  customLabel,
  ...props
}) {
  const { control } = useFormContext();
  const ref = useRef();

  const handleOnChange = (value, onChange) => {
    if (onValueChanged && typeof onValueChanged === "function") {
      onValueChanged(value);
    }
    onChange(value);
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
        <div className="space-y-1">
          <label htmlFor="" className="text-slate-700 text-sm my-2 font-medium">
            {label}
          </label>
          {value ? (
            <>
              <div
                className={classNames([
                  "p-3 rounded-md flex items-center justify-between border w-full",
                  { "border-red-600 text-red-600": invalid },
                ])}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 border text-slate-500 rounded">
                    <FaRegFileImage size={24} />
                  </div>
                  <p className="font-medium truncate max-w-[80%] text-start w-full text-slate-700 text-sm">
                    {value.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <CgClose
                    className="cursor-pointer hover:scale-125 transition-all"
                    onClick={() => onChange(undefined)}
                  />
                </div>
              </div>
              <div className={"text-xs text-red-600"}>{error?.message}</div>
            </>
          ) : (
            <div>
              <input
                {...props}
                ref={ref}
                onChange={(event) => {
                  return handleOnChange(event?.target?.files[0], onChange);
                }}
                value={value}
                type="file"
                accept={accept}
                hidden
              />
              <Button
                className={classNames([
                  "flex items-center px-3 py-2 text-xs rounded-md border gap-3 drop-shadow-none hover:bg-slate-500 hover:text-white",
                  { "border-red-600 text-red-600": invalid },
                  ...className?.split(" "),
                ])}
                onClick={() => ref.current.click()}
              >
                <FiUpload />
                {customLabel ?? "Upload a File"}
              </Button>
              <div className={"text-xs text-red-600"}>{error?.message}</div>
            </div>
          )}
        </div>
      )}
    />
  );
}
