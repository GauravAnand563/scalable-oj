import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import APIRoutes from "./../../Utils/APIRoutes.json";
// import "./Login.component.css";
function LoginComponent() {
  let navigate = useNavigate();
  let [resultState, setResultState] = useState({
    isResult: false,
    isLoading: false,
    isFormSuccess: false,
    alertMessage: "",
  });

  let [form, setForm] = useState({ username: "", password: "" });

  const [cookies, setCookie] = useCookies(["sessionid"]);
  const [isError, setIsError] = useState(false);

  function createCookie(key, value, path) {
    setCookie(key, value, { path: path });
  }

  useEffect(() => {
    console.log(form);
  }, [form]);
  let onFormSubmit = async (e) => {
    e.preventDefault();
    setResultState((prev) => {
      return { ...prev, isLoading: true };
    });

    let keys = Object.keys(form);
    for (let i = 0; i < keys.length; i++) {
      if (form[keys[i]].length == 0) {
        setResultState((prev) => {
          return {
            ...prev,
            isResult: true,
            isLoading: false,
            isFormSuccess: true,
            alertMessage: "Please fill all the fields",
          };
        });

        return;
      }
    }
    let response = await fetch(
      APIRoutes.SERVER_HOST + APIRoutes.APIS.LOGIN_USER,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (response.ok) {
      let x = response.headers.entries();
      console.log(response);
      for (let entry of response.headers.entries()) {
        console.log("header", entry);
      }
      // createCookie(, )
      setResultState((prev) => {
        return {
          ...prev,
          isResult: true,
          isLoading: false,
          isFormSuccess: true,
          alertMessage: "login successfull",
        };
      });

      // alert("Login Successfull, goto problem section to solve problems")

      navigate("/", { state: { login_state: "success" } });
    } else {
      setResultState((prev) => {
        return {
          ...prev,
          isResult: true,
          isLoading: false,
          isFormSuccess: true,
          alertMessage: "login failed",
        };
      });
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  };

  let onFormChange = (e) => {
    console.log(e);
    setForm((prev) => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      {isError && (
        <div className="flex flex-row mx-4 mt-2 items-center justify-start bg-red-400 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="flex text-black items-baseline">
            <h3 className="font-bold mx-3 ">Invalid credentials!</h3>
            <div className="text-xs">
              Please check the username or password.
            </div>
          </div>
        </div>
      )}
      <div className="flex p-4 items-center justify-center">
        <div className="mt-8 p-8 rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-30 bg-base-200 flex flex-col h-full">
          <form
            onSubmit={onFormSubmit}
            onChange={onFormChange}
            className="logincomponent-form"
          >
            <h2 className="text-center text-4xl mb-8">Sign In</h2>

            <div className="logincomponent-group mb-8">
              <label className="label">
                <p className="label-text">Username</p>
              </label>
              <input
                type="text"
                name="username"
                autoFocus
                placeholder="Username"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="logincomponent-group mb-8">
              <label className="label">
                <p className="label-text">Password</p>
              </label>
              <input
                type="password"
                name="password"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="logincomponent-group">
              <input type="submit" value="Submit" className="btn w-full" />
            </div>
          </form>
          <div className="mt-7 flex justify-between">
            <h2 className="text-sm">Not registered yet?</h2>
            <span>
              <a href="/register">Register</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginComponent;
