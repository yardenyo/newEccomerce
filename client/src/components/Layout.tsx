import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import Notice from "@/components/Notice";
import { useState } from "react";

const Layout = () => {
  const user = useSelector(selectCurrentUser);
  const isDarkMode = user?.userSettings?.settings?.darkMode;
  const [showNotice, setShowNotice] = useState(true);

  return (
    <>
      <Notice showNotice={showNotice} setShowNotice={setShowNotice} />
      <main
        className={`App${isDarkMode ? " dark" : ""} container mx-auto ${
          showNotice && "pt-10"
        } px-4`}
      >
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
