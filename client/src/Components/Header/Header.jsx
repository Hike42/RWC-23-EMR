import React from "react";
import logo from "../../assets/logo.svg";
import UserDropdown from "./UserDropdown";

const Header = () => {
  return (
    <div className="header">
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg backdrop-filter backdrop-blur-md z-50">
        <div className="container mx-auto px-4 flex items-center">
          <a href="/">
            <img src={logo} alt="logo" className="w-20 h-20 mr-10" />
          </a>
          <div className="flex-grow">
            <a
              href="/"
              className="text-2xl font-bold text-gray-800 mr-10 font-webbelliscup"
            >
              Back-office
            </a>
            <a
              href="/demandes"
              className="text-xl font-bold text-gray-500 mr-10 font-webbelliscup"
            >
              Demandes
            </a>
            <a
              href="/accreditations"
              className="text-xl font-bold text-gray-500 mr-10 font-webbelliscup"
            >
              Accréditations
            </a>
            <a
              href="/rapports"
              className="text-xl font-bold text-gray-500 mr-10 font-webbelliscup"
            >
              Rapports
            </a>
            <a
              href="/chat"
              className="text-xl font-bold text-gray-500 mr-10 font-webbelliscup"
            >
              Chat
            </a>
          </div>
          <div className="ml-auto">
            <UserDropdown />
          </div>
        </div>
      </header>
      <div className="mb-16"></div>
    </div>
  );
};

export default Header;
