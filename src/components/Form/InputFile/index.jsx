import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";

export default function InputFile({
  label,
  name,
  className = "",
  required = false,
  onValueChanged,
  customRef = null,
  ...props
}) {
  const { control } = useFormContext();

  const handleOnChange = (file, onChange) => {
    if (onValueChanged && typeof onValueChanged === "function") {
      onValueChanged(file);
    }
    onChange(file);
  };

  const isValidFileType = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "image/png",
      "image/jpeg",
    ];
    return file && validTypes.includes(file.type);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        validate: (file) =>
          file
            ? isValidFileType(file) || "File type must be PDF, DOC, PNG, or JPG"
            : !required,
      }}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <div>
          <label
            htmlFor={name}
            className="text-slate-700 text-sm font-medium my-2"
          >
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value?.name}
              placeholder="Belum ada file yang dipilih"
              disabled
              className={classNames([
                "flex-1 bg-[#f2f2f2] text-primary-700 border rounded px-3 py-2 placeholder:text-sm",
                { "font-bold": value },
                { "border-red-600": invalid },
                ...className?.split(" "),
              ])}
            />
            <label
              htmlFor={`file-${name}`}
              className="px-4 py-2.5 border border-primary-700 text-primary-700 text-sm rounded-lg font-bold cursor-pointer hover:text-white hover:bg-primary-700"
            >
              Pilih File
            </label>
            <input
              ref={customRef}
              id={`file-${name}`}
              type="file"
              className="hidden"
              accept=".pdf, .doc, .png, .jpg, .jpeg"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && isValidFileType(file)) {
                  handleOnChange(file, onChange);
                } else {
                  onChange(null);
                }
              }}
              {...props}
            />
          </div>
          <div className="text-xs text-red-600">{error?.message}</div>
        </div>
      )}
    />
  );
}
