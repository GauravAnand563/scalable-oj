import React, { useEffect } from "react";
import LoginComponent from "../../Components/Login/Login.component";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";

let tabItemData = [
  { to: "/", content: "Home" },
  { to: "/register", content: "Register" },
  { to: "/resetpassword", content: "Reset Password" },
];
function LoginPage() {
  useEffect(() => {
    // For declaring Title
    document.title = "Login - ScalableOJ";
  });

  return (
    <PagebaseMiddleware>
      <LoginComponent />
    </PagebaseMiddleware>
  );
}

export default LoginPage;
