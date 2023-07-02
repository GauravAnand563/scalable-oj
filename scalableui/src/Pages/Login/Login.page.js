import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginComponent from "../../Components/Login/Login.component";
import PagetabComponent from "../../Components/Pagetab/Pagetab.component";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";

let tabItemData = [
    {to:"/", content: 'Home'  },
    {to:"/register", content: 'Register'  },
    {to:"/resetpassword", content: 'Reset Password'  },
    
    
  ]
function LoginPage(){

    
  useEffect(() => {
    // For declaring Title
    document.title = 'Login - Redesigned OJ';
  });

    return <PagebaseMiddleware>
        <h2 style={{margin:0}}>Login Form</h2>
        <PagetabComponent tabItems={tabItemData} />
        <hr />

        <LoginComponent />
    </PagebaseMiddleware>
}

export default LoginPage  