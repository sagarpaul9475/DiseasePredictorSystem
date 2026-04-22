import React, { useRef, useEffect } from "react";
import LoginBtn from "./Login-Button";
import LogoHorizontal from "../img/logo.svg";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import cancelIcon from "../img/cross icon.svg";
const Header = () => {
const { currentUser } = useGlobalContext();
const [dropdown, setDropdown] = useState(false);
const dropdownRef = useRef(null);
const toggleDropdownMenu = () => {
setDropdown(!dropdown);
};
const handleClickOutsideDropdown = (event) => {
if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
setDropdown(false);
}
};
useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
};
}, []);
return (
<div className="fixed z-40 bg-white">
<div className="shadow-md flex justify-around gap-24 items-center h-16 w-screen">
<figure className="h-16 w-auto z-20">
<img
            src={LogoHorizontal}
            alt="logo-header"
            className="h-full w-full object-cover"
/>
</figure>
<nav className="hidden lg:flex lg:gap-3 text-lg z-20 justify-center items-center">
    {currentUser ? (
<div className="flex lg:gap-4">
<NavLink to="/" className="px-1">
                Predictor
</NavLink>
<NavLink to="dashboard" className="px-1">
                Dashboard
</NavLink>
<NavLink to="contactdoctor" className="px-1">
                Consult
</NavLink>
</div>
) : (
<>
<a href="#services" className="px-1">
                Services
</a>
<a href="#about" className="px-1">
                About Us
</a>
</>
)}
<LoginBtn />
</nav>
<button className="block lg:hidden" onClick={toggleDropdownMenu}>
<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 hover:rotate-180 transition all duration-300 ease-in-out"
>
<path
              strokeLinecap="round"
              strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
/>
</svg>
</button>
</div>
{dropdown ? (
<div
          ref={dropdownRef}
          className="dropdown fixed top-30 mt-2 lg:hidden right-5 bg-white rounded-lg shadow-lg p-4 w-48 z-50"
>
<nav className="gap-1 flex-col  text-xl w-full text-gray-700 font-medium flex justify-start items-start">
<button
              className="w-full flex justify-end mb-5  hover:bg-gray-100 rounded-lg p-1"
              onClick={() => {
setDropdown(false);
}}
>
<img src={cancelIcon} alt="" className="w-7 hover:rotate-90 transition all duration-300 ease-in-out" />
</button>
{currentUser ? (
<>
<NavLink
                  to="/"
                  onClick={() => {
setDropdown(false);
}}
>
                  Predictor
</NavLink>
<div className="border-t border-gray-300 my-1.5" />
<NavLink
                  to="dashboard"
                  onClick={() => {
setDropdown(false);
}}
                >
                  Dashboard
                </NavLink>
                <div className="border-t border-gray-300 my-1.5" />
                <NavLink
                  to="contactdoctor"
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  Consult
                </NavLink>
              </>
            ) : (
              <>
                <a
                  href="#services"
                  className="p-5 flex justify-center"
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  Services
                </a>
                <div className="border-t border-gray-300 my-1.5" />
                <a
                  href="#about"
                  className="p-5 flex justify-center"
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  About Us
                </a>
              </>
            )}
            <div className="border-t border-gray-300 my-1.5" />
<LoginBtn />
</nav>
</div>
) : null}
</div>
);
};
export default Header;