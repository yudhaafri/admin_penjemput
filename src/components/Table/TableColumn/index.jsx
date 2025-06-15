import React from "react";
import classNames from "classnames";

const TableColumn = ({ items }) => {
  if (!items.length) return null;
  return (
    <colgroup>
      {items.map((item, key) => {
        let defaultWidth = "w-[100px]";
        if (typeof item.width === "string") {
          if (item.width.indexOf("px") > -1) defaultWidth = `w-[${item.width}]`;
          else defaultWidth = `w-[${item.width}px]`;
        }
        if (typeof item.width === "number") {
          defaultWidth = `w-[${item.width.toString()}px]`;
        }
        return <col key={key} className={classNames(defaultWidth)}></col>;
      })}
    </colgroup>
  );
};

export default React.memo(TableColumn);
