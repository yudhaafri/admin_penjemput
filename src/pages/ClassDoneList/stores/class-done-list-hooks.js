import { debounce } from "lodash";
import usePickUpListStore from "./class-done-list-store";

const usePickUpListHooks = () => {
  const { setPage, setLimit, setSearch, visibleColumns, setVisibleColumns } =
    usePickUpListStore((state) => ({
      setPage: state.setPage,
      setLimit: state.setLimit,
      setSearch: state.setSearch,
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

  const handleColumnVisibility = (columnId) => {
    setVisibleColumns(
      visibleColumns.includes(columnId)
        ? visibleColumns.filter((id) => id !== columnId)
        : [...visibleColumns, columnId]
    );
  };

  return {
    handleSearch,
    handleColumnVisibility,
    onChangePage,
    onChangeRowsPerPage,
  };
};

export default usePickUpListHooks;
