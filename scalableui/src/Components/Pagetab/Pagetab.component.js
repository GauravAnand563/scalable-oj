import React from "react"
import { Link } from "react-router-dom"

import "./Pagetab.component.css"
function PagetabComponent(props){
    console.log(props)

    return <div className="container">
    {/* <div className="page-container"> */}
      {/* <div className="pagetab-tab">  */}

          {props.tabItems.map((eachTabItem, eachIndex)=>{
            return <div key={eachIndex} className = "dataCard"> <Link to={eachTabItem.to}> <p className = 'text'>{eachTabItem.content}</p> </Link> </div>
          })}
          
        </div>
    {/* </div> */}
  // </div>
}
export default PagetabComponent