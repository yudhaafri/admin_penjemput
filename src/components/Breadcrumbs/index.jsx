import { FiChevronRight } from "react-icons/fi";
import { RiHome6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <div className="bg-transparent flex items-center flex-wrap">
      <ul className="flex items-center">
        <li className="inline-flex items-center">
          <Link to="/">
            <RiHome6Line className="text-slate-500 hover:text-sky-700" />
          </Link>
          <FiChevronRight className="text-slate-300 mx-2 w-5" />
        </li>
        {Array.isArray(items) && items.length
          ? items.map((item, key) => (
              <li className="inline-flex items-center" key={key}>
                {item?.path ? (
                  <Link
                    to={item.path}
                    className="mb-0 text-slate-600 text-sm hover:text-sky-700"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <p className="mb-0 text-sky-700 text-sm font-semibold px-2 py-1">
                    {item.label}
                  </p>
                )}
                {key < items.length - 1 && (
                  <FiChevronRight className="text-slate-300 mx-2 w-5" />
                )}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
