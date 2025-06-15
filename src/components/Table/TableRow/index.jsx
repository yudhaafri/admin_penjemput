import classNames from "classnames";
import { isArray, map } from "lodash";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const getClassNameValue = (object, data, key) => {
  if (object?.className) {
    if (typeof object?.className === "string")
      return [...object.className.split(" ")];
    if (typeof object?.className === "function")
      return object.className(data[object.dataIndex], data, key);
  } else return data[object.dataIndex];
  return;
};

const getCellValue = (object, data, key) => {
  if (object?.render) {
    if (typeof object?.render === "string") return object.render;
    if (typeof object?.render === "function")
      return object.render(data[object.dataIndex], data, key);
  } else return data[object.dataIndex];
  return;
};

const TableRow = ({ columns, datas, borderless }) => {
  if (!columns.length) return null;
  if (!isArray(datas)) {
    return map(Object.keys(datas), (data) => {
      return <CollapseRow columns={columns} datas={datas} data={data} />;
    });
  }
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
      <tr
        key={key}
        className={classNames(["border-b last:border-b-0"], {
          "border-none": borderless,
        })}
      >
        {columns.map((col, idx) => (
          <td
            key={idx}
            className={classNames(
              ["text-gray-600", "text-sm", "p-3", "border-r last:border-r-0"],
              { sticky: Boolean(col?.fixed) },
              { "right-0": col?.fixed && col?.fixed === "right" },
              { "left-0": col?.fixed && col?.fixed === "left" },
              {"border-none ": borderless},
              // `${(key % 2) !== 0 ? 'bg-white' : 'bg-gray-200'}`,
              getClassNameValue(col, data, key)
            )}
          >
            {getCellValue(col, data, key)}
          </td>
        ))}
      </tr>
    );
  });
};

const CollapseRow = ({ columns = [], datas = {}, data }) => {
  const [open, setOpen] = useState(true);
  return (
    <React.Fragment>
      <tr
        className={classNames([
          // "border-b last:border-b-0",
          "border-y",
          "hover:cursor-pointer",
          "bg-amber-50",
        ])}
        onClick={() => setOpen(!open)}
      >
        <td colSpan={columns.length} className="text-gray-600 text-sm p-3">
          <div className="flex items-center space-x-2 font-bold">
            {open ? <BsChevronUp /> : <BsChevronDown />}
            <span>{data}</span>
          </div>
        </td>
      </tr>
      {open
        ? map(datas[data], (d, key) => (
            <tr className={classNames([""])}>
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className={classNames(
                    [
                      "text-gray-600",
                      "text-sm",
                      "p-3",
                      // "border-r last:border-r-0",
                    ],
                    { sticky: Boolean(col?.fixed) },
                    { "right-0": col?.fixed && col?.fixed === "right" },
                    { "left-0": col?.fixed && col?.fixed === "left" },
                    // `${(key % 2) !== 0 ? 'bg-white' : 'bg-gray-200'}`,
                    getClassNameValue(col, d, key)
                  )}
                >
                  {getCellValue(col, d, key)}
                </td>
              ))}
            </tr>
          ))
        : null}
    </React.Fragment>
  );
};

export default TableRow;
