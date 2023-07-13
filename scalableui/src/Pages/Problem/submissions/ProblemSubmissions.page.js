import React, { useEffect, useState } from "react"
import APIRoutes from "./../../../Utils/APIRoutes.json"
let ProblemSubmissionsPage = (props)=>{
    let [submissions, setSubmissions] = useState([]);
    let [isResult, setIsResult] = useState(false)
    // console.log(props.problemDetails)
    let getAllSubmissions = async ()=>{
        let {problemid}= props
        console.log(problemid)
        let response = await fetch( APIRoutes.SERVER_HOST + APIRoutes.APIS.GET_USER_SUBMISSIONS, {
            method:"POST",
            credentials:'include',
            headers:{
                'content-type':'application/json',
            },
            body: JSON.stringify({
                problemid:problemid
            })
        } );
        
        
        if(response.ok){
            let responsedata = await response.json()
            setSubmissions(responsedata)
            setIsResult(true)

        }else{
            console.error("RESPONSE FAILED TO *FETCH USER PROBLEMS")
            console.log(response)
            setIsResult(true)
        }
    };
    useEffect(()=>{
        getAllSubmissions()
    },[])

    useEffect(()=>{
        console.log(submissions)
    },submissions)




    console.log(props)
    return <div style={{width:'100%'}}>

{isResult == false  ? <progress class="progress is-small is-dark" max="100">15%</progress> : 
                    <>

                        {submissions.length == 0 ? 'No Submissions yet':''}
        <table  style={{width:'100%'}} className="table is-hoverable">
            <thead>
                <tr><th>Submission ID</th><th>verdict</th><th>Language</th><th>Status</th></tr>
            </thead>
            <tbody>
                        {submissions.map((eachSubmission,eachIndex)=>{
                            return <tr>
                                <td> {eachSubmission.id} </td>
                                <td> {eachSubmission.verdict} </td>
                                <td> {eachSubmission.language} </td>
                                <td> {eachSubmission.status} </td>
                            </tr>
                        })}
            </tbody>
        </table>

        </>

}
    </div>
}
export default ProblemSubmissionsPage