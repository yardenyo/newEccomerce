import NavbarLinks from "@/constants/NavbarLinks";
import { AiOutlineSearch } from "react-icons/ai";
import { PiUserCircleLight } from "react-icons/pi";
import { BsHandbag } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4 flex items-center justify-between">
      <div className="title flex items-center space-x-4">
        <RxHamburgerMenu className="navbar-link flex md:hidden" size={20} />
        <h2>
          <Link to="/">E-Commerce</Link>
        </h2>
      </div>
      <ul className="md:flex space-x-4 hidden items-center">
        {NavbarLinks.map((link) => (
          <li key={link.key}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <div className="flex space-x-4 items-center">
        <AiOutlineSearch className="navbar-link hidden md:flex" size={20} />
        <PiUserCircleLight className="navbar-link hidden md:flex" size={20} />
        <BsHandbag className="navbar-link" size={20} />
      </div>
    </nav>
  );
};

export default Navbar;
