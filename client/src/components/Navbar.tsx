import HamburgerSidebar from "@/components/HamburgerSidebar";
import NavbarLinks from "@/constants/NavbarLinks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSignoutMutation } from "@/features/auth/authApiSlice";
import { Avatar } from "primereact/avatar";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const [visible, setVisible] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [signout] = useSignoutMutation();

  const handleSignOut = async () => {
    await signout({});
    window.location.href = "/";
  };

  const openUserDropdown = () => {
    setShowUserDropdown(true);
  };

  const closeUserDropdown = () => {
    setShowUserDropdown(false);
  };

  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const userAvatar = () => {
    const firstNameInitial = getFirstLetter(user?.firstName || "");
    const lastNameInitial = getFirstLetter(user?.lastName || "");
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <nav
      className="relative z-20 container mx-auto py-4 flex items-center justify-between"
      onMouseLeave={closeUserDropdown}
    >
      <div className="title flex items-center space-x-4">
        <div className="flex md:hidden">
          <i
            className="pi pi-bars navbar-link"
            onClick={() => setVisible(true)}
          />
        </div>
        <Link to="/">
          <h2>E-Commerce</h2>
        </Link>
      </div>
      <ul className="md:flex space-x-4 hidden items-center">
        {NavbarLinks.map((link) => (
          <li key={link.key}>
            <Link to={link.path} className="navbar-link">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex space-x-4 items-center">
        {user ? (
          <>
            <div className="hidden md:flex">
              <i className="pi pi-search navbar-link" />
            </div>
            <div
              className="relative hidden md:flex group"
              onMouseEnter={openUserDropdown}
            >
              <Avatar
                label={userAvatar()}
                className="user-avatar rounded-full"
              />
              {showUserDropdown && (
                <div className="user-dropdown">
                  <Link to="/dashboard" className="user-dropdown-link">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="user-dropdown-link"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div>
              <div className="shopping-bag flex items-center justify-center space-x-2">
                <i className="pi pi-shopping-bag navbar-link" />
                <span className="counter">2</span>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link to="/auth/sign-in">
              <button className="btn btn-primary">Sign In</button>
            </Link>
            <Link to="/auth/sign-up">
              <button className="btn btn-secondary">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
      <HamburgerSidebar visible={visible} setVisible={setVisible} />
    </nav>
  );
};

export default Navbar;
