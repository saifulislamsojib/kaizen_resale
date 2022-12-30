import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <Toaster />
        <Navbar />
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration getKey={(location) => location.pathname} />
    </main>
  );
};

export default Layout;
