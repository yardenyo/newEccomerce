import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import NavbarLinks from "@/constants/NavbarLinks";
import { Fragment } from "react";
import { Link } from "react-router-dom";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const HamburgerSidebar = ({ visible, setVisible }: Props) => {
  const customHeader = (
    <Fragment>
      <h2 style={{ marginBottom: 0 }}>E-Commerce</h2>
    </Fragment>
  );

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      header={customHeader}
    >
      <div className="w-full flex flex-col">
        <span className="p-input-icon-left w-full">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            className="w-full focus:outline-none focus:shadow-none"
          />
        </span>
        <div className="wrapper">
          <ul className="flex flex-col space-y-4 mt-4">
            {NavbarLinks.map((link) => (
              <li key={link.key} className="border-b">
                <Link
                  to={link.path}
                  className="navbar-link"
                  onClick={() => setVisible(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-4 mt-[40vh]">
            <div className="navbar-link border-b">
              <Link to="/cart" onClick={() => setVisible(false)}>
                Cart
              </Link>
            </div>
            <div className="navbar-link border-b">
              <Link to="/wishlist" onClick={() => setVisible(false)}>
                Wishlist
              </Link>
            </div>
            <div className="navbar-link border-b">
              <button className="w-full btn btn-primary">
                <Link to="/auth/sign-in">Sign In</Link>
              </button>
            </div>
            <div className="flex social-icons space-x-4">
              <Link
                to="https://www.linkedin.com/in/yarden-yosef/"
                target="_blank"
              >
                <i
                  className="pi pi-linkedin navbar-link"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </Link>
              <Link to="https://github.com/yardenyo" target="_blank">
                <i
                  className="pi pi-github navbar-link"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </Link>
              <Link to="mailto:yardenjobs@gmail.com" target="_blank">
                <i
                  className="pi pi-envelope navbar-link"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default HamburgerSidebar;
