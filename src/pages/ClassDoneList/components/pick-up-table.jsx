import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Table } from "src/components";
import { PICK_UP_LIST_QUERY } from "../lib/constants";
import usePickUpListStore from "../stores/class-done-list-store";
import usePickUpListHooks from "../stores/class-done-list-hooks";
import { usePickupQuery } from "src/hooks/services/usePickup";
import dayjs from "dayjs";

const PickUpTable = () => {
  const methods = useFormContext();

  const { watch } = methods;

  const {
    page,
    limit,
    search,
    sortBy,
    sortType,
    setSortBy,
    setSortType,
    visibleColumns,
    setDefaultColumns,
    setVisibleColumns,
    days,
  } = usePickUpListStore((state) => ({
    page: state.page,
    limit: state.limit,
    search: state.search,
    sortBy: state.sortBy,
    sortType: state.sortType,
    setSortBy: state.setSortBy,
    setSortType: state.setSortType,
    visibleColumns: state.visibleColumns,
    setVisibleColumns: state.setVisibleColumns,
    setDefaultColumns: state.setDefaultColumns,
    days: state.days,
  }));

  const { data: list, isFetching } = usePickupQuery([
    PICK_UP_LIST_QUERY,
    {
      days,
      page,
      limit,
      class: search,
      sortBy: sortBy ? sortBy + ":" + sortType : "",
      sortDirection: sortType ?? "DESC",
    },
  ]);

  const { onChangePage, onChangeRowsPerPage } = usePickUpListHooks();

  const tableColumn = useMemo(
    () => [
      {
        id: "no",
        title: "No",
        dataIndex: "no",
        className: "w-16 text-center",
        render: (value, data, index) => {
          const no =
            (parseInt(list?.meta?.page) - 1) * parseInt(list?.meta?.limit) +
            index +
            1;
          return <div className="w-full">{no}</div>;
        },
      },
      {
        id: "class_student",
        title: "Kelas",
        dataIndex: "class_student",
        className: "w-1/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => <div className="w-full">{value ?? "-"}</div>,
      },
      {
        id: "hour",
        title: "Jam",
        dataIndex: "hour",
        className: "w-2/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => <div className="w-full">{value ?? "-"}</div>,
      },
      {
        id: "student",
        title: "Status",
        dataIndex: "student",
        className: "w-1/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => <div className="w-full">{value}</div>,
      },
    ],
    [page, limit, list]
  );

  useEffect(() => {
    // Set visibleColumns based on tableColumn
    const defaultVisibleColumns = tableColumn.map((col) => col.id);
    setDefaultColumns(tableColumn);
    setVisibleColumns(defaultVisibleColumns);
  }, [tableColumn, setVisibleColumns]);

  const filteredColumns = useMemo(() => {
    return tableColumn.filter((col) => visibleColumns?.includes(col.id));
  }, [tableColumn, visibleColumns]);

  return (
    <Table
      columns={filteredColumns}
      dataSource={[]}
      isLoading={isFetching}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      pagination={{
        page: list?.meta?.currentPage,
        limit: list?.meta?.itemsPerPage,
        total: list?.meta?.totalItems,
        prev_pages: !!list?.links?.previous,
        next_pages: !!list?.links?.next,
      }}
    />
  );
};

export default PickUpTable;
