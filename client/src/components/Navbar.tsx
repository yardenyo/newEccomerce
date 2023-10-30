import HamburgerSidebar from "@/components/HamburgerSidebar";
import NavbarLinks from "@/constants/NavbarLinks";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="py-4 flex items-center justify-between">
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
        <div className="hidden md:flex">
          <i className="pi pi-search navbar-link" />
        </div>
        <div className="hidden md:flex">
          <i className="pi pi-user navbar-link" />
        </div>
        <div>
          <div className="shopping-bag flex items-center justify-center space-x-2">
            <i className="pi pi-shopping-bag navbar-link" />
            <span className="badge bg-black text-white rounded-full w-4 h-4 flex items-center justify-center p-2 text-xs">
              2
            </span>
          </div>
        </div>
      </div>
      <HamburgerSidebar visible={visible} setVisible={setVisible} />
    </nav>
  );
};

export default Navbar;
