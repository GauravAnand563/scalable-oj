import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import APIRoutes from "./../../Utils/APIRoutes.json" 
import "./Login.component.css"
import { useNavigate } from "react-router-dom";
function LoginComponent(){
    
    let navigate = useNavigate();
    let [resultState, setResultState] = useState({
        isResult: false,
        isLoading: false,
        isFormSuccess:false,
        alertMessage: ''
    })
    
    let [form,setForm] = useState({username:'',password:''})
    
    const [cookies, setCookie] = useCookies(["sessionid"]);
    
    function createCookie(key, value, path) {
        setCookie(key, value, { path: path });
    }


    useEffect(()=>{
        console.log(form)
    },[form])
    let onFormSubmit = async (e)=>{
        e.preventDefault()
        setResultState(prev=>{
            return {...prev,
                isLoading: true
            }
        })
        
        let keys = Object.keys(form);
        for(let i=0; i < keys.length ; i++){
            if(form[keys[i]].length == 0){
                setResultState(prev=>{
                    return {...prev, 
                        isResult: true,
                        isLoading: false,
                        isFormSuccess:true,
                        alertMessage:'Please fill all the fields'
                    }
                })
                

                return;
            }
        }
        let response = await fetch(APIRoutes.SERVER_HOST + APIRoutes.APIS.LOGIN_USER,{
            method:"POST",
            credentials: 'include', 
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(form)
        })
        if(response.ok){
            let x = response.headers.entries()
            console.log(response)
            for(let entry of response.headers.entries()) {
                console.log('header', entry);
              }
            // createCookie(, )
            setResultState(prev=>{
                return {...prev, 
                    isResult: true,
                    isLoading: false,
                    isFormSuccess:true,
                    alertMessage:'login successfull'
                }
            })

            alert("Login Successfull, goto problem section to solve problems")
            
            

            navigate("/")

        }else{
            setResultState(prev=>{
                return {...prev, 
                    isResult: true,
                    isLoading: false,
                    isFormSuccess:true,
                    alertMessage:'login failed'
                }
            })
            alert("Login Failed")
        }
    }

    let onFormChange = (e)=>{
        console.log(e)
        setForm(prev=>{
            return {...form, [e.target.name]:e.target.value}
        })
    }
    return <div className="logincomponent-base">
        <form onSubmit={onFormSubmit} onChange={onFormChange} className="logincomponent-form">
            <div className="logincomponent-group">
                <div className="logincomponent-group-item-title">Username :  </div>
                <input type="text" name="username" required className="logincomponent-group-item-input" />
            </div>
            <div className="logincomponent-group">
                <div className="logincomponent-group-item-title">Password :  </div>
                <input type="password" name="password" required className="logincomponent-group-item-input" />
            </div>
            <div  className="logincomponent-group">
                <input type="submit" value="Submit"  className="logincomponent-submit"/> 
            </div>
        </form>
    </div>
}
export default LoginComponent