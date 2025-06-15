import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useOnClickOutside } from "src/hooks";

const TableRowEditable = ({
  columns,
  datas,
  activeData,
  onRowSelected,
  name,
}) => {
  const methods = useFormContext();

  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (activeData?.isNew) {
      setActiveItem(activeData);
    }
  }, [activeData?.isNew]);

  const getCellValue = (object, data, key) => {
    if (object?.render) {
      if (typeof object?.render === "string") return object.render;
      if (typeof object?.render === "function")
        return object.render(
          methods.watch(`${name}.${key}.${object?.dataIndex}`),
          methods.watch(`${name}.${key}`),
          key,
        );
    } else return methods.watch(`${name}.${key}.${object?.dataIndex}`);
    return;
  };

  const getClassNameValue = (object, data, key) => {
    if (object?.className) {
      if (typeof object?.className === "string")
        return [...object.className.split(" ")];
      if (typeof object?.className === "function")
        return object.className(data[object.dataIndex], data, key);
    } else return data[object.dataIndex];
    return;
  };

  const onFocusCol = (event, col, data) => {
    if (!activeData) {
      if (event?.detail === 1) {
        setActiveItem({ col, data });
      } else if (event?.detail === 2) {
        onRowSelected({ col, data });
        setActiveItem(null);
      }
    }
  };

  if (!columns.length) return null;
  if (!datas.length) {
    return (
      <tr className="text-gray-600 text-sm text-center font-semibold">
        <td colSpan={columns.length} className="text-gray-600 text-sm p-3">
          No data to display
        </td>
      </tr>
    );
  }
  return datas.map((data, key) => {
    return (
      <tr key={data?.id}>
        {columns.map((col, idx) => (
          <td
            key={idx}
            className={classNames(
              ["text-gray-600", "text-sm", "border"],
              { sticky: Boolean(col?.fixed) },
              { "right-0": col?.fixed && col?.fixed === "right" },
              { "left-0": col?.fixed && col?.fixed === "left" },
              {
                "bg-amber-50": activeData && activeData?.data?.id === data?.id,
              },
              {
                "bg-amber-50": activeItem && activeItem?.data?.id === data?.id,
              },
              getClassNameValue(col, data, key),
            )}
            onClick={(event) => onFocusCol(event, col, data)}
          >
            {activeData &&
            activeData?.col?.id === col?.id &&
            activeData?.data?.id === data?.id ? (
              <Input
                col={col}
                data={data}
                activeData={activeData}
                onRowSelected={onRowSelected}
                name={`${name}.${key}.${col?.dataIndex}`}
              />
            ) : (
              <div
                className={classNames([
                  "p-3",
                  {
                    "border border-gray-500":
                      activeItem &&
                      activeItem?.col?.id === col?.id &&
                      activeItem?.data?.id === data?.id &&
                      !(activeData && activeData?.data?.id === data?.id),
                  },
                ])}
              >
                {getCellValue(col, data, key)}
              </div>
            )}
          </td>
        ))}
      </tr>
    );
  });
};

// eslint-disable-next-line no-unused-vars
const Input = ({ onRowSelected, name, col, data, activeData }) => {
  const { control } = useFormContext();
  const ref = useRef();

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  useOnClickOutside(ref, () => {
    ref?.current?.focus();
    // onRowSelected &&
    //   typeof onRowSelected === "function" &&
    //   !activeData &&
    //   onRowSelected(null);
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <input
          ref={ref}
          onBlur={() => ref?.current?.focus()}
          className="p-3 w-full bg-white outline-none focus:border focus:border-red-500"
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
};

export default TableRowEditable;
