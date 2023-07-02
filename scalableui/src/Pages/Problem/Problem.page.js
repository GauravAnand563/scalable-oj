import React, { useEffect, useState } from "react";
import { useParams, Navigate, Routes, Route, Router } from "react-router-dom";
import PagetabComponent from "../../Components/Pagetab/Pagetab.component";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";
import APIRoutes from "./../../Utils/APIRoutes.json"
import ProblemHome from "./home/ProblemHome";
import ProblemSubmissionsPage from "./submissions/ProblemSubmissions.page";
import ProblemSubmitPage from "./submit/ProblemSubmit.page";
import { ProblemSolvePage } from "./ProblemSolvePage/ProblemSolvePage";

function ProblemPage (props){
  let [problemState, setProblemState] = useState({})

  let {id} = useParams()
  console.log(id)
console.log(problemState)
  let fetchProblemById =  async (problemid)=>{
    console.log("REQUIRED")
  let response = await fetch(APIRoutes.SERVER_HOST +  APIRoutes.APIS.GET_PROBLEM_BY_ID+problemid, {method:"GET"})
  console.log(response)
  if(response.ok){
    let jsonResponse = await response.json()
console.log(jsonResponse)
    setProblemState(prev=>{
      return {
        ...prev,
        problem: jsonResponse
      }
    })


  }else{
    alert("Error Loading Problems")
  }
}


  useEffect(()=>{
    document.title = 'Problemset - Redesigned OJ'
    fetchProblemById(id)
  },[])

  let problemTabItems = [
    {to: "/problem/" + id +"/", content: 'Problem'  },
    // {to:"/problem/" + id + "/submit", content: 'Submit'  },
    {to:"/problem/" + id + "/submissions", content: 'Submissions'  },
  ]

  return <PagebaseMiddleware>
          {/* <button className="button" onClick={()=>{
            window.history.go(-1);
          }}>Go Back</button><br /><br />
      <h2 className="title is-5" style={{margin:0}}>{problemState.problem?.title}</h2> */}

      {/* <PagetabComponent tabItems={problemTabItems} /> */}
    {/* <hr style={{color:"black"}} /> */}

      {/* <div>
        <p style={{padding:"5px"}}>
            {problemState.problem?.description}
        </p>
      </div> */}

      
      <Routes>
        {/* <Route exact path={""} element={<ProblemHome problemDescription={problemState.problem?.description} />} />
        <Route exact path={"submit"} element={<ProblemSubmitPage problemDetails={problemState.problem} />} /> */}
        <Route exact path={""} element={<ProblemSolvePage problemDescription={problemState.problem?.description} problemDetails={problemState?.problem}/>} />
        <Route exact path={"submissions"} element={<ProblemSubmissionsPage problemDetails={problemState?.problem} problemid = {id} />} />
      </Routes>


      <br />
      <br />
      <br />
  
      </PagebaseMiddleware>
}



export default (ProblemPage)