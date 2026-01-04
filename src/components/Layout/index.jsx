import { Sidebar, Header } from "src/components";

const Layout = ({ children, fullHeight = false }) => {
  return (
    <div className={`flex w-full ${fullHeight && "h-screen"}`}>
      <Sidebar />
      <div className="w-full overflow-hidden">
        <Header />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
