import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";

const Layout = () => {
  const user = useSelector(selectCurrentUser);
  const isDarkMode = user?.userSettings?.settings?.darkMode;

  return (
    <main className={`App${isDarkMode ? " dark" : ""} container mx-auto px-4`}>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
