import { Outlet } from "react-router-dom";
import Notice from "@/components/Layout/Notice";
import Subscribe from "@/components/Layout/Subscribe";
import Footer from "@/components/Layout/Footer";
import { useState } from "react";

const Layout = () => {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <main className="font-body">
      <Notice showNotice={showNotice} setShowNotice={setShowNotice} />
      <div className={`App ${showNotice && "pt-10"}`}>
        <Outlet />
      </div>
      <Subscribe />
      <Footer />
    </main>
  );
};

export default Layout;
