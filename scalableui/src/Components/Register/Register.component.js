import React, { useEffect, useState } from "react";

import APIRoutes from "./../../Utils/APIRoutes.json";
import "./Register.component.css";
function RegisterComponent() {
  let [resultState, setResultState] = useState({
    isResult: false,
    isLoading: false,
    isFormSuccess: false,
    alertMessage: "",
  });
  let [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
  });
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
      APIRoutes.SERVER_HOST + APIRoutes.APIS.REGISTER_USER,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (response.ok) {
      setResultState((prev) => {
        return {
          ...prev,
          isResult: true,
          isLoading: false,
          isFormSuccess: true,
          alertMessage: "user created, check your email for verification",
        };
      });
    } else {
      setResultState((prev) => {
        return {
          ...prev,
          isResult: true,
          isLoading: false,
          isFormSuccess: true,
          alertMessage: "user register failed",
        };
      });
    }
  };

  let onFormChange = (e) => {
    console.log(e);
    setForm((prev) => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex p-4 items-center justify-center">
      <div className="m-8 p-8 rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-30 bg-base-200 flex flex-col h-full">
        <form
          onSubmit={onFormSubmit}
          onChange={onFormChange}
          className="registercomponent-form"
        >
          <h2 className="text-center text-4xl mb-8">Register</h2>

          <div className="flex mb-8">
            <div className="registercomponent-group flex-grow mr-2">
              <label className="label">
                <p className="label-text">First Name</p>
              </label>
              <input
                type="text"
                name="firstname"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="registercomponent-group flex-grow ml-2">
              <label className="label">
                <p className="label-text">Last Name</p>
              </label>
              <input
                type="text"
                name="lastname"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex mb-8">
            <div className="registercomponent-group flex-grow mr-2">
              <label className="label">
                <p className="label-text">Username</p>
              </label>
              <input
                type="text"
                name={`username_${Math.random()}`}
                autoComplete="off"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="registercomponent-group flex-grow ml-2">
              <label className="label">
                <p className="label-text">Email</p>
              </label>
              <input
                type="text"
                name="email"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="registercomponent-group mb-8">
            <label className="label">
              <p className="label-text">Password</p>
            </label>
            <input
              type="password"
              name={`password_${Math.random()}`}
              autoComplete="off"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="registercomponent-group">
            <input type="submit" value="Submit" className="btn w-full" />
          </div>
        </form>
        <div className="mt-7 flex justify-between">
          <h2 className="text-sm">Already registered?</h2>
          <span>
            <a href="/login">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
}
export default RegisterComponent;
