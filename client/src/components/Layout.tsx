import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

const Layout = () => {
  const user = useSelector(selectCurrentUser);
  const isDarkMode = user?.userSettings?.settings?.darkMode;

  return (
    <main className={`App${isDarkMode ? " dark" : ""}`}>
      <Outlet />
    </main>
  );
};

export default Layout;
