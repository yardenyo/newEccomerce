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
          <div className="top-section w-full flex flex-col items-center md:flex-row md:justify-between md:items-center">
            <div className="left-content text-center md:text-left flex flex-col items-center md:flex-row md:items-center gap-4">
              <div className="title mb-4 md:mb-0">
                <h2>E-Commerce</h2>
              </div>
              <div className="divider hidden md:block">
                <Divider layout="vertical" className="h-2 opacity-40" />
              </div>
              <div className="description hidden md:block">
                Technology Store
              </div>
            </div>
            <div className="right-content">
              <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
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
          <div className="bottom-section w-full flex flex-col items-center md:flex-row md:justify-between md:items-center">
            <div className="left-content text-center md:text-left flex flex-col items-center md:flex-row md:items-center gap-4">
              <div className="copyright flex flex-col items-center md:flex-row md:items-center gap-4">
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
            <div className="right-content mt-4 md:mt-0">
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
