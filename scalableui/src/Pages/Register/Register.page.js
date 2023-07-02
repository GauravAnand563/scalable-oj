import React, { useEffect } from "react";
import PagetabComponent from "../../Components/Pagetab/Pagetab.component";
import RegisterComponent from "../../Components/Register/Register.component";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";


let tabItemData = [
    {to:"/", content: 'Home'  },
    {to:"/login", content: 'Login'  },
    {to:"/resetpassword", content: 'Reset Password'  },
    
  ]

function RegisterPage(){
    
  useEffect(() => {
    // For declaring Title
    document.title = 'Register - Redesigned OJ';
  });

    return <PagebaseMiddleware>
        <h2 className="title is-3"  style={{margin:0}}>Register Form</h2>
        <PagetabComponent tabItems={tabItemData} />
        <hr />
        

        <RegisterComponent />
    </PagebaseMiddleware>
        

}
export default RegisterPage