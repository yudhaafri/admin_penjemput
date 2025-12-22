import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Table } from "src/components";
import { PICK_UP_LIST_QUERY } from "../lib/constants";
import usePickUpListStore from "../stores/pick-up-list-store";
import usePickUpListHooks from "../stores/pick-up-list-hooks";
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
      start_date: dayjs(new Date()).format("YYYY-MM-DD"),
      end_date: dayjs(new Date()).format("YYYY-MM-DD"),
      page,
      limit,
      class_students: search,
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
        id: "nsp",
        title: "NSP",
        dataIndex: "nsp",
        className: "w-1/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => <div className="w-full">{value ?? "-"}</div>,
      },
      {
        id: "student_name",
        title: "Nama Siswa",
        dataIndex: "student_name",
        className: "w-2/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => <div className="w-full">{value ?? "-"}</div>,
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
        render: (value) => <div className="w-full">{value}</div>,
      },
      {
        id: "updated_at",
        title: "Tanggal",
        dataIndex: "updated_at",
        className: "w-1/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => (
          <div className="w-full">
            {value ? dayjs(value).format("YYYY-MM-DD hh:mm:ss") : "-"}
          </div>
        ),
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
      dataSource={list?.data}
      isLoading={isFetching}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      pagination={{
        page: list?.meta?.page,
        limit: list?.meta?.limit,
        total: list?.meta?.total,
        // prev_pages: !!list?.links?.previous,
        // next_pages: !!list?.links?.next,
      }}
    />
  );
};

export default PickUpTable;
