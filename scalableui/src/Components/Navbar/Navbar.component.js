import React, { useEffect, useState } from "react";
// import "./Navbar.component.css";
import axios from "axios";
import { HiLogout } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import APIRoutes from "../../Utils/APIRoutes.json";
import ThemeComponent from "./Theme.component";

function NavbarComponent() {
  let tabItems = [
    // {to:"/", content: 'Home'  },
    { to: "/contests", content: "Contests" },
    { to: "/problemset", content: "Problems" },
    { to: "/about", content: "About" },
    { to: "/createproblem", content: "Create Problem" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const loginState = location.state && location.state.login_state;

  useEffect(() => {
    if (loginState === "success") {
      setTimeout(() => {
        navigate("/", { replace: true, state: undefined });
      }, 2000);
    }
  }, [loginState, navigate]);

  const [userProfile, setUserProfile] = useState({
    username: "",
    is_superuser: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    axios
      .get(APIRoutes.SERVER_HOST + APIRoutes.APIS.GET_USER, {
        withCredentials: true,
      })
      .then((response) => {
        setUserProfile(response.data);
        setIsLoggedIn(true); // Update login status
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loginState]); // Add isLoggedIn as a dependency

  const handleLogout = () => {
    axios
      .post(
        APIRoutes.SERVER_HOST + APIRoutes.APIS.LOGOUT_USER,
        {
          cookie: "",
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setIsLoggedIn(false); // Update login status
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {userProfile.username ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              {userProfile.username}
              {userProfile.is_superuser ? (
                <span className="ml-2 text-green-300 text-xl">
                  <MdVerified />
                </span>
              ) : (
                <></>
              )}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow rounded-box w-fit"
            >
              <li onClick={handleLogout}>
                <button className="btn border-white bg-red-400 text-white">
                  Logout
                  <span className="icon">
                    <HiLogout />
                  </span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // <span>{userProfile.username}</span>
          <a className="btn" href="/login">
            Login
          </a>
        )}
      </div>
    </div>
  );
}
export default NavbarComponent;
