import React, { useEffect, useState } from "react";

import "./Register.component.css";
import APIRoutes from "./../../Utils/APIRoutes.json" 
function RegisterComponent(){
    let [resultState, setResultState] = useState({
        isResult: false,
        isLoading: false,
        isFormSuccess:false,
        alertMessage: ''
    })
    let [form,setForm] = useState({firstname:'',lastname:'',username:'',password:'',email:''})
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
        let response = await fetch(APIRoutes.SERVER_HOST + APIRoutes.APIS.REGISTER_USER ,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(form)
        })
        if(response.ok){
            setResultState(prev=>{
                return {...prev, 
                    isResult: true,
                    isLoading: false,
                    isFormSuccess:true,
                    alertMessage:'user created, check your email for verification'
                }
            })
        }else{
            setResultState(prev=>{
                return {...prev, 
                    isResult: true,
                    isLoading: false,
                    isFormSuccess:true,
                    alertMessage:'user register failed'
                }
            })
        }
    }

    let onFormChange = (e)=>{
        console.log(e)
        setForm(prev=>{
            return {...form, [e.target.name]:e.target.value}
        })
    }

    return <div className="registercomponent-base">
        {resultState.isResult ? 
        <div>Status : {resultState.alertMessage} </div> : ''}
    <form onSubmit={onFormSubmit} onChange={onFormChange} className="registercomponent-form">
        


        <div className="registercomponent-group">
            <div className="registercomponent-group-item-title">firstname :  </div>
            <input type="text" name="firstname" required className="registercomponent-group-item-input"  />
        </div>
        <div className="registercomponent-group">
            <div className="registercomponent-group-item-title">lastname :  </div>
            <input type="text" name="lastname" required className="registercomponent-group-item-input" />
        </div>



        <div className="registercomponent-group">
            <div className="registercomponent-group-item-title">Username :  </div>
            <input type="text" name="username" required className="registercomponent-group-item-input" />
        </div>

        <div className="registercomponent-group">
            <div className="registercomponent-group-item-title">Password :  </div>
            <input type="password" name="password" required className="registercomponent-group-item-input" />
        </div>



        <div className="registercomponent-group">
            <div className="registercomponent-group-item-title">email :  </div>
            <input type="text" name="email" required className="registercomponent-group-item-input" />
        </div>

        <div  className="registercomponent-group">
            <input type="submit" value="Submit"  className="registercomponent-submit"/> 
        </div>
    </form>
</div>
}
export default RegisterComponent