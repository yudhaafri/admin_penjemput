import { debounce } from "lodash";
import useShuttleHistoryStore from "./store";

const useShuttleHistoryHooks = () => {
  const {
    setPage,
    setLimit,
    setSearch,
    setSearchClass,
    visibleColumns,
    setVisibleColumns,
  } = useShuttleHistoryStore((state) => ({
    setPage: state.setPage,
    setLimit: state.setLimit,
    setSearch: state.setSearch,
    setSearchClass: state.setSearchClass,
    visibleColumns: state.visibleColumns,
    setVisibleColumns: state.setVisibleColumns,
  }));

  const onChangePage = (page) => {
    setPage(page);
  };

  const onChangeRowsPerPage = (limit) => {
    setLimit(limit);
  };

  const handleSearch = debounce((keyword) => {
    setSearch(keyword);
  }, 500);

  const handleSearchClass = debounce((keyword) => {
    setSearchClass(keyword);
  }, 500);

  const handleColumnVisibility = (columnId) => {
    setVisibleColumns(
      visibleColumns.includes(columnId)
        ? visibleColumns.filter((id) => id !== columnId)
        : [...visibleColumns, columnId]
    );
  };

  return {
    handleSearch,
    handleSearchClass,
    handleColumnVisibility,
    onChangePage,
    onChangeRowsPerPage,
  };
};

export default useShuttleHistoryHooks;
