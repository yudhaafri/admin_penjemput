import classNames from "classnames";
import { Pagination, Spinner } from "src/components";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableRowEditable from "./TableRowEditable";

const CustomTable = ({
  columns = [],
  dataSource = [],
  isLoading = false,
  // stripped = false,
  wrapperClassName = "",
  headerClassName = "",
  className = "",
  // layout = "auto",
  defaultSortOrder = undefined,
  pagination = undefined,
  onChangeRowsPerPage = undefined,
  onChangePage = undefined,
  hidePagination = false,
  activeData = null,
  onRowSelected,
  editable = false,
  name = "",
  isSpacePagination,
  borderless = false,
}) => {
  return (
    <div
      className={`${
        isSpacePagination && "flex flex-col justify-between h-[calc(100%-50px)]"
      }`}
    >
      {/* <div className="border border-b-0 border-solid border-gray-200"> */}
      <div
        className={classNames("border border-solid border-gray-200", {
          "border-none": borderless,
        })}
      >
        <div
          className={classNames(
            ["overflow-auto"],
            [...wrapperClassName.split(" ")]
          )}
        >
          <table
            className={classNames(["min-w-full"], [...className.split(" ")])}
          >
            {/* {layout === "fixed" && <TableColumn items={columns} />} */}
            <TableHeader
              items={columns}
              headerClassName={headerClassName}
              defaultSortOrder={defaultSortOrder}
              borderless={borderless}
            />
            <tbody className="overflow-y-scroll w-full">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="w-100 flex justify-center p-5">
                      <Spinner className="text-xl" />
                    </div>
                  </td>
                </tr>
              ) : editable ? (
                <TableRowEditable
                  name={name}
                  columns={columns}
                  datas={dataSource}
                  activeData={activeData}
                  onRowSelected={onRowSelected}
                  hidePagination={hidePagination}
                />
              ) : (
                <TableRow
                  columns={columns}
                  datas={dataSource}
                  hidePagination={hidePagination}
                  borderless={borderless}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
      {!hidePagination && (
        <Pagination
          pagination={pagination}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={onChangePage}
        />
      )}
    </div>
  );
};

export default CustomTable;
