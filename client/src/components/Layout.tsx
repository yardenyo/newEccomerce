import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Notice from "@/components/Notice";
import { useState } from "react";

const Layout = () => {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <main className="font-body">
      <Notice showNotice={showNotice} setShowNotice={setShowNotice} />
      <div className={`App container mx-auto ${showNotice && "pt-10"} px-4`}>
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
