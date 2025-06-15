import usePreviousValue from "beautiful-react-hooks/usePreviousValue";
import classNames from "classnames";
import { isEqual } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import { Button } from "src/components";

const paginationObject = {
  page: 1,
  limit: 10,
  total: 0,
  previous_pages: null,
  next_pages: null,
};

const Pagination = ({
  pagination = paginationObject,
  onChangeRowsPerPage,
  onChangePage,
}) => {
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const prevCurrentPage = usePreviousValue(currentPage);

  const rowsPerPage = useMemo(() => rowPerPage, [rowPerPage]);
  const changeRowsPerPage = useCallback(
    (page) => {
      setRowPerPage(page);
      setCurrentPage(1);
      if (onChangeRowsPerPage) onChangeRowsPerPage(page);
    },
    [onChangeRowsPerPage]
  );

  useEffect(() => {
    setRowPerPage(pagination.limit);
  }, [pagination.limit]);

  const renderPaginationText = useCallback(() => {
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end =
      currentPage <= 1 && pagination?.total <= rowsPerPage
        ? pagination?.total
        : pagination?.limit * currentPage >= pagination?.total
        ? pagination?.total
        : currentPage * rowsPerPage;

    return (
      <p className="mb-0 text-gray-600 text-sm">{`${start || 0}-${
        end || 0
      } dari ${pagination?.total || 0}`}</p>
    );
  }, [rowsPerPage, currentPage, pagination.total]);

  useEffect(() => {
    if (!isEqual(prevCurrentPage, currentPage)) {
      if (onChangePage) onChangePage(currentPage);
    }
  }, [currentPage, prevCurrentPage]);

  return (
    <div
      className={classNames([
        // "w-full pt-4 pb-1 border-t",
        "w-full pt-4 pb-1",
        "flex items-center justify-between",
        "lg:flex-row lg:space-x-6 lg:justify-end",
      ])}
    >
      <div className="flex space-x-2">
        <div className="flex items-center space-x-2 mb-0 text-gray-600 text-sm">
          <span className="hidden lg:block">Jumlah baris per halaman : </span>
          <select
            aria-label="Jumlah baris per halaman :"
            className="bg-transparent outline-none"
            value={rowPerPage}
            onChange={(event) => changeRowsPerPage(event?.target?.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            {/* {pagination?.total && (
              <option value={pagination?.total}>All</option>
            )} */}
          </select>
        </div>
        <div className="mb-0 text-gray-600 text-sm">
          {renderPaginationText()}
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-0 text-gray-600">
        <CgChevronDoubleLeft
          className={classNames([
            "hidden md:block transition-transform",
            {
              "text-gray-400": !pagination?.prev_pages,
            },
            {
              "hover:cursor-pointer hover:scale-105": pagination?.prev_pages,
            },
          ])}
          onClick={() => {
            pagination?.prev_pages && setCurrentPage(1);
          }}
        />
        <CgChevronLeft
          className={classNames([
            "hidden md:block transition-transform",
            {
              "text-gray-400": !pagination?.prev_pages,
            },
            {
              "hover:cursor-pointer hover:scale-105": pagination?.prev_pages,
            },
          ])}
          onClick={() => {
            pagination?.prev_pages && setCurrentPage((curr) => curr - 1);
          }}
        />
        <CgChevronRight
          className={classNames([
            "hidden md:block transition-transform",
            {
              "text-gray-400": !pagination?.next_pages,
            },
            {
              "hover:cursor-pointer hover:scale-105": pagination?.next_pages,
            },
          ])}
          onClick={() => {
            pagination?.next_pages && setCurrentPage((curr) => curr + 1);
          }}
        />
        <CgChevronDoubleRight
          className={classNames([
            "hidden md:block transition-transform",
            {
              "text-gray-400": !pagination?.next_pages,
            },
            {
              "hover:cursor-pointer hover:scale-105": pagination?.next_pages,
            },
          ])}
          onClick={() => {
            pagination?.next_pages &&
              setCurrentPage(Math.ceil(pagination?.total / rowPerPage));
          }}
        />
        <Button
          className={classNames([
            "block md:hidden text-xs",
            {
              "transition-transform hover:cursor-pointer hover:scale-110":
                pagination?.previous_pages,
            },
          ])}
          disabled={!pagination?.previous_pages}
          onClick={() => {
            setCurrentPage((curr) => curr - 1);
          }}
        >
          Prev
        </Button>
        <Button
          className={classNames([
            "block md:hidden text-xs",
            {
              "transition-transform hover:cursor-pointer hover:scale-110":
                pagination?.next_pages,
            },
          ])}
          disabled={!pagination?.next_pages}
          onClick={() => {
            setCurrentPage((curr) => curr + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
