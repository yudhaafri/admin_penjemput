import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Select, SelectForm } from "src/components";

const AsyncSelectForm = ({
  data,
  totalPages,
  isFetching,
  onChangePage,
  onChangeSearch,
  refetch,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptions = () => {
    if (loadMore) {
      return options.concat(data);
    } else {
      return data;
    }
  };

  useEffect(() => {
    if (!isFetching) {
      setOptions(handleOptions());
      setLoadMore(false);
    }
  }, [isFetching]);

  const onMenuScrollToBottom = () => {
    if (page < totalPages) {
      setLoadMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      typeof onChangePage === "function" && onChangePage(nextPage);
    }
  };

  const handleInputChange = (search) => {
    if (!isLoading && search) setIsLoading(true);
    setPage(1);
    typeof onChangePage === "function" && onChangePage(1);
    onInputChange(search);
  };

  const onInputChange = debounce((search) => {
    if (
      onChangeSearch &&
      typeof onChangeSearch === "function" &&
      (search?.length > 1 || !search)
    ) {
      setIsLoading(false);
      onChangeSearch(search);
    }
  }, 1000);

  if (!props?.name) {
    return (
      <Select
        {...props}
        isLoading={isFetching || isLoading}
        onMenuOpen={() => {
          setOpen(true);
          if (typeof refetch === "function") {
            refetch();
          }
        }}
        onMenuClose={() => setOpen(false)}
        menuIsOpen={open}
        options={!isLoading ? options : []}
        onMenuScrollToBottom={onMenuScrollToBottom}
        onInputChange={open ? handleInputChange : null}
      />
    );
  }

  return (
    <SelectForm
      {...props}
      isLoading={isFetching || isLoading}
      onMenuOpen={() => {
        setOpen(true);
        if (typeof refetch === "function") {
          refetch();
        }
      }}
      onMenuClose={() => setOpen(false)}
      menuIsOpen={open}
      options={!isLoading ? options : []}
      onMenuScrollToBottom={onMenuScrollToBottom}
      onInputChange={open ? handleInputChange : null}
    />
  );
};

export default AsyncSelectForm;
