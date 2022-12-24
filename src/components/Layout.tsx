import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      {/* footer */}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </main>
  );
};

export default Layout;
