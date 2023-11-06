import { Outlet } from "react-router-dom";
import Notice from "@/components/Notice";
import { useState } from "react";

const Layout = () => {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <main className="font-body">
      <Notice showNotice={showNotice} setShowNotice={setShowNotice} />
      <div className={`App ${showNotice && "pt-10"}`}>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
