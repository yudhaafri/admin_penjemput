import classNames from "classnames";
import React, { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

const TableHeader = ({
  items,
  headerClassName = "",
  defaultSortOrder,
  borderless,
}) => {
  const [sortOrder, setSortOrder] = useState(
    defaultSortOrder?.toLowerCase() ?? "ASC"
  );

  const getValue = (value) => {
    if (typeof value === "string") return value;
    if (typeof value === "function") return value();
    return "";
  };

  if (!items.length) return null;
  return (
    <thead className={headerClassName}>
      <tr className="relative">
        {items.map((item, key) => {
          return (
            <th
              key={key}
              className={classNames(
                [
                  "bg-primary-50",
                  "text-black",
                  "text-sm",
                  "font-semibold",
                  "capitalize",
                  "sticky top-[-0.5px]",
                  "p-3",
                  // "border",
                  // "border-b",
                  "border-r last:border-r-0",
                  "z-[1]",
                ],
                { "text-left": item?.alignment === "left" },
                {
                  "text-center":
                    !item?.alignment || item?.alignment === "center",
                },
                { "text-right": item?.alignment === "right" },
                { sticky: Boolean(item?.fixed) },
                { "right-0": item?.fixed && item?.fixed === "right" },
                { "left-0": item?.fixed && item?.fixed === "left" },
                { "border-none": borderless },
                item.columnClassName && [...item.columnClassName.split(" ")]
              )}
            >
              <div className="absolute border-b w-full left-0 bottom-0"></div>
              {item?.sortable && item?.sorter ? (
                <div
                  className={classNames([
                    "flex items-center gap-1 cursor-pointer",
                    "text-gray-700 hover:text-gray-400",
                    { "justify-start": item?.alignment === "left" },
                    {
                      "justify-center":
                        !item?.alignment || item?.alignment === "center",
                    },
                    { "justify-end": item?.alignment === "right" },
                  ])}
                  onClick={() => {
                    setSortOrder((curr) => {
                      if (curr === "ASC") return "DESC";
                      return "ASC";
                    });
                    if (typeof item?.sorter === "function")
                      item.sorter(item.dataIndex, sortOrder);
                  }}
                >
                  {getValue(item.title)}
                  {sortOrder === "ASC" ? (
                    <BsCaretUpFill
                      size={10}
                      className="cursor-pointer hover:text-gray-400"
                    />
                  ) : (
                    <BsCaretDownFill
                      size={10}
                      className="cursor-pointer hover:text-gray-400"
                    />
                  )}
                </div>
              ) : (
                getValue(item.title)
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
