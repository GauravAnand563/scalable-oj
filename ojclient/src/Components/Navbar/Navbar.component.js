import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.component.css";
import SearchBar from "./SearchBar/SearchBar";

function NavbarComponent() {
  let tabItems = [
    // {to:"/", content: 'Home'  },
    { to: "/contests", content: "Contests" },
    { to: "/problemset", content: "Problems" },
    { to: "/about", content: "About" },
    { to: "/createproblem", content: "Create Problem" },
  ];

  return (
    <div className="navBar">
      <div className="logoAndText">
        <img
          className="image"
          src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-judge-auction-flatarticons-blue-flatarticons-1.png"
        />
        <a className="logoText" href="/">
          <h1>
            <b>ScalableOJ</b>
          </h1>
        </a>
      </div>

      <div className="container">
        {tabItems.map((eachTabItem, eachIndex) => {
          return (
            <div key={eachIndex} className="dataCard">
              {" "}
              <Link to={eachTabItem.to}>
                {" "}
                <p className="text">{eachTabItem.content}</p>{" "}
              </Link>{" "}
            </div>
          );
        })}
      </div>
      <SearchBar />
      <div className="login">
        <Link className="link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
export default NavbarComponent;
