import NavbarLinks from "@/constants/NavbarLinks";
import { Divider } from "primereact/divider";
import socialLinks from "@/constants/SocialLinks";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto">
        <div className="footer flex flex-col">
          <div className="top-section w-full flex justify-between items-center">
            <div className="left-content flex justify-between items-center gap-4">
              <div className="title">
                <h2>E-Commerce</h2>
              </div>
              <div className="divider">
                <Divider layout="vertical" className="h-2 opacity-40" />
              </div>
              <div className="description">Technology Store</div>
            </div>
            <div className="right-content">
              <ul className="flex space-x-4 items-center">
                {NavbarLinks.map((link) => (
                  <li key={link.key}>
                    <Link to={link.path} className="footer-link">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Divider className="h-8 opacity-40" />
          <div className="bottom-section w-full flex justify-between items-center">
            <div className="left-content flex justify-between items-center gap-4">
              <div className="copyright flex gap-4">
                <p className="opacity-40">
                  Copyright © {currentYear} E-Commerce. All rights reserved.
                </p>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="right-content">
              <ul className="flex space-x-4 items-center">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <Link key={index} to={link.link} target="_blank">
                      <i className={link.iconClass}></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
