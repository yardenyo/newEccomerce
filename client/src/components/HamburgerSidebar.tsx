import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import NavbarLinks from "@/constants/NavbarLinks";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { selectCart } from "@/features/cart/cartSlice";
import { Divider } from "primereact/divider";
import { selectWishlist } from "@/features/wishlist/wishlistSlice";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const HamburgerSidebar = ({ visible, setVisible }: Props) => {
  const user = useSelector(selectCurrentUser);
  const cart = useSelector(selectCart);
  const wishlist = useSelector(selectWishlist);

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
        <div className="wrapper w-full h-[85vh] flex flex-col justify-between">
          <ul className="flex flex-col space-y-2 mt-4">
            {NavbarLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.path}
                  className="navbar-link"
                  onClick={() => setVisible(false)}
                >
                  {link.title}
                </Link>
                <Divider />
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-4">
            {!user ? (
              <>
                <div className="navbar-link">
                  <button className="w-full btn btn-primary">
                    <Link to="/auth/sign-in">Sign In</Link>
                  </button>
                </div>
                <div className="navbar-link">
                  <button className="w-full btn btn-secondary">
                    <Link to="/auth/sign-up">Sign Up</Link>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center navbar-link">
                  <Link to="/cart" onClick={() => setVisible(false)}>
                    Cart
                  </Link>
                  <div className="flex space-x-2 shopping-bag items-center">
                    <i className="pi pi-shopping-bag" />
                    <span className="counter">{cart?.products?.length}</span>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between items-center navbar-link">
                  <Link to="/wishlist" onClick={() => setVisible(false)}>
                    Wishlist
                  </Link>
                  <div className="flex space-x-2 wishlist items-center">
                    <i className="pi pi-heart" />
                    <span className="counter">{wishlist?.length}</span>
                  </div>
                </div>
                <Divider />
              </>
            )}
            <div className="flex social-icons space-x-4">
              <Link
                to="https://www.linkedin.com/in/yarden-yosef/"
                target="_blank"
              >
                <i className="pi pi-linkedin navbar-link text-xl"></i>
              </Link>
              <Link to="https://github.com/yardenyo" target="_blank">
                <i className="pi pi-github navbar-link text-xl"></i>
              </Link>
              <Link to="mailto:yardenjobs@gmail.com" target="_blank">
                <i className="pi pi-envelope navbar-link text-xl"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default HamburgerSidebar;
