import React from "react"
import "./Pagebase.middleware.css"
function PagebaseMiddleware(props){
    return <div className="page-base">
        <div className="page-container">
        {props.children}
        </div>
    </div>
}

export default PagebaseMiddleware