import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";

const TableFilter = ({
  tableColumn,
  toggleColumnVisibility,
  visibleColumns,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <section className="relative grid place-items-center">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className={classNames(
              "p-2.5 text-sm text-primary-500 border rounded hover:bg-primary-500 hover:text-white",
              { "bg-primary-500 text-white": isOpen }
            )}
            ref={buttonRef}
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <FiFilter size={16} />
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg border focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            ref={dropdownRef}
          >
            <div className="py-1 max-h-64 overflow-y-scroll" role="none">
              {tableColumn.map((col) => (
                <label
                  key={col.id}
                  className="flex items-center px-4 py-2 text-sm cursor-pointer w-full"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 accent-primary-500 cursor-pointer"
                    id={col.id}
                    checked={visibleColumns.includes(col.id)}
                    onChange={() => toggleColumnVisibility(col.id)}
                  />
                  <span className="ml-2">
                    {typeof col.title === "function"
                      ? col?.title()
                      : col?.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TableFilter;
