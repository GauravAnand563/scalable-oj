import React, { useEffect } from "react";
import RegisterComponent from "../../Components/Register/Register.component";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";

let tabItemData = [
  { to: "/", content: "Home" },
  { to: "/login", content: "Login" },
  { to: "/resetpassword", content: "Reset Password" },
];

function RegisterPage() {
  useEffect(() => {
    // For declaring Title
    document.title = "Register - ScalableOJ";
  });

  return (
    <PagebaseMiddleware>
      <RegisterComponent />
    </PagebaseMiddleware>
  );
}
export default RegisterPage;
