import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Table } from "src/components";
import useShuttleHistoryStore from "../stores/store";
import useShuttleHistoryHooks from "../stores/hooks";
import { usePickupQuery } from "src/hooks/services/usePickup";
import dayjs from "dayjs";
import { SHUTTLE_HISTORY_QUERY } from "../lib/constants";
import { useNavigate } from "react-router-dom";

const ShuttleHistoryTable = () => {
  const methods = useFormContext();
  const navigate = useNavigate();

  const { watch } = methods;

  const {
    page,
    limit,
    search,
    searchClass,
    sortBy,
    sortType,
    setSortBy,
    setSortType,
    visibleColumns,
    setDefaultColumns,
    setVisibleColumns,
  } = useShuttleHistoryStore((state) => ({
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

  const { data: list, isFetching } = usePickupQuery([
    SHUTTLE_HISTORY_QUERY,
    {
      start_date,
      end_date: end_date || start_date,
      page,
      limit,
      search: search,
      class_student: searchClass,
      sort_by: sortBy,
      sort_order: sortType ?? "ASC",
    },
  ]);

  const { onChangePage, onChangeRowsPerPage } = useShuttleHistoryHooks();

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
      {
        id: "action",
        title: "Aksi",
        dataIndex: "action",
        className: "w-fit text-center",
        render: (value, data) => (
          <div className="flex items-center justify-center space-x-2">
            <Button
              className="border border-[#65B741] text-[#65B741] bg-rounded text-primary-500"
              // onClick={() => navigate(`./detail/${data?.id}`)}
            >
              Detail
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
        // prev_pages: !!list?.links?.previous,
        // next_pages: !!list?.links?.next,
      }}
    />
  );
};

export default ShuttleHistoryTable;
