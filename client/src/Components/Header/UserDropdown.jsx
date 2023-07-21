import React, { useState, useEffect, useRef } from "react";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Action pour se déconnecter
    console.log("Déconnexion...");
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center text-gray-800 focus:outline-none font-webbelliscup"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
        Utilisateur
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute right-0 mt-2 w-36 bg-white rounded shadow-lg z-10 border focus:outline-none transition-opacity duration-300 font-webbelliscup ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: "100%" }}
        >
          <a href="/profil">
            <button
              type="button"
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-transparent focus:outline-none transition-opacity duration-300"
              onClick={() => {
                // Action pour accéder au profil
                console.log("Accéder au profil...");
              }}
            >
              Mon profil
            </button>
          </a>
          <button
            type="button"
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-transparent hover:text-red-500 focus:outline-none transition-opacity duration-300"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
