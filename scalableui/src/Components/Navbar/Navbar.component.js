import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./Navbar.component.css";
import logo from "./Scalable.png";
import SearchBar from "./SearchBar/SearchBar";
import ThemeComponent from "./Theme.component";

function NavbarComponent() {
  let tabItems = [
    // {to:"/", content: 'Home'  },
    { to: "/contests", content: "Contests" },
    { to: "/problemset", content: "Problems" },
    { to: "/about", content: "About" },
    { to: "/createproblem", content: "Create Problem" },
  ];

  return (
    <div className="navbar h-16 py-9 pr-9">
      <div className="navbar-start flex">
        <img
          className="h-12 ml-4"
          src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-judge-auction-flatarticons-blue-flatarticons-1.png"
        />
        <a className="p-4" href="/">
          <h1>
            <b>Scalable OJ</b>
          </h1>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {tabItems.map((eachTabItem, eachIndex) => {
            return (
              <li key={eachIndex}>
                <a href={eachTabItem.to}>{eachTabItem.content}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeComponent />
        <a className="btn" href="/login">
          {/* <Link className="link no-underline" to="/login"> */}
            Login
          {/* </Link> */}
        </a>
      </div>
    </div>
  );
}
export default NavbarComponent;
