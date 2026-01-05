import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Table } from "src/components";
import useShuttleCardStore from "../stores/store";
import useShuttleCardHooks from "../stores/hooks";
import { useStudentQuery } from "src/hooks/services/usePickup";
import dayjs from "dayjs";
import { STUDENT_LIST_QUERY } from "../lib/constants";
import { useNavigate } from "react-router-dom";

const ShuttleCardTable = () => {
  const methods = useFormContext();
  const navigate = useNavigate();

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
  } = useShuttleCardStore((state) => ({
    page: state.page,
    limit: state.limit,
    search: state.search,
    searchClass: state.searchClass,
    sortBy: state.sortBy,
    sortType: state.sortType,
    setSortBy: state.setSortBy,
    setSortType: state.setSortType,
    visibleColumns: state.visibleColumns,
    setVisibleColumns: state.setVisibleColumns,
    setDefaultColumns: state.setDefaultColumns,
  }));

  const start_date =
    watch("start_date") && dayjs(watch("start_date")).format("YYYY-MM-DD");
  const end_date =
    watch("end_date") && dayjs(watch("end_date")).format("YYYY-MM-DD");

  const { data: list, isFetching } = useStudentQuery([
    STUDENT_LIST_QUERY,
    {
      page,
      limit,
      search: search,
      sort_by: sortBy,
      sort_order: sortType ?? "ASC",
    },
  ]);

  const { onChangePage, onChangeRowsPerPage } = useShuttleCardHooks();

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
        id: "full_name",
        title: "Nama Siswa",
        dataIndex: "full_name",
        className: "w-2/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => <div className="w-full">{value ?? "-"}</div>,
      },
      {
        id: "class",
        title: "Kelas",
        dataIndex: "class",
        className: "w-1/8",
        sortable: true,
        sorter: (column, methods) => {
          setSortBy(column);
          setSortType(methods);
        },
        render: (value) => <div className="w-full">{value}</div>,
      },
      {
        id: "action",
        title: "Aksi",
        dataIndex: "action",
        className: "w-fit text-center",
        render: (value, data) => (
          <div className="flex items-center justify-center space-x-2">
            <Button
              className="border border-blue-light-3 text-blue-light-3 bg-rounded"
              onClick={() => navigate(`./detail/${data?.id}`)}
            >
              Lihat Profil
            </Button>
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
        prev_pages: list?.meta?.page < 1,
        next_pages: list?.meta?.page < list?.meta?.totalPages,
      }}
    />
  );
};

export default ShuttleCardTable;
