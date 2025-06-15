import { Sidebar, Header } from "src/components";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full overflow-hidden">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
