import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PagetabComponent from "../../../Components/Pagetab/Pagetab.component";
import PagebaseMiddleware from "../../../Middlewares/Pagebase/Pagebase.middleware";
import APIRoutes from "./../../../Utils/APIRoutes.json"
import styles from './ProblemSubmit.page.module.css'
import classNames from 'classnames'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
let defaultCPPCode = `#include <bits/stdc++.h>
using namespace std;
int main(){
  // Start typing from here..
  return 0;
}`
function ProblemSubmitPage (props){
  let {id} = useParams()
  console.log(props)
  let [results,setResults] = useState({output:'',status:'',submission:'',verdict:'',})
  let [sourcecode,setSourcecode] = useState(defaultCPPCode)
  let [problem, setProblem] = useState({})
  useEffect(()=>{
    console.log(results)
  }, results)
  useEffect(()=>{
    setProblem(props.problemDetails);
  },[sourcecode])

const[selectedLang,setSelectedLang] = useState('C++')

  useEffect(() => {
    setProblem(props.problemDetails)
    // setSuperCount(count * 2);
  }, [props.problemDetails]);

  

  // On File Change
  let onFileSelect = (e)=>{

    let fr = new FileReader()
    fr.readAsText(e.target.files[0])
    fr.onload = ()=>{
      setSourcecode(fr.result)
    }
    
  }
  // on File uplaod
  let onFileSubmit = (e)=>{
    e.preventDefault()

    // window.alert("SD")
  }



  let onChangeTextArea = (e)=>{
    setSourcecode(prev=>{
      return e.target.value
    })
  }


  // Code submit
  let codeSubmit = async (e)=>{
    e.preventDefault()

    console.log(sourcecode)
    let response = await fetch(APIRoutes.SERVER_HOST + APIRoutes.APIS.SUBMIT_PROBLEM, {
      method:"POST",
      credentials: "include",
      headers:{
        'Content-type':'text/plain',
        'problemcode':problem.problemcode,
        'language':'C++'
      },
      body: sourcecode
    })

    if(response.ok){

    let dataResults = await response.json()
    console.log(dataResults)
    setResults({
      output:dataResults.output,
      status: dataResults.status,
      submission: dataResults.submission,
      verdict: dataResults.verdict
    })
    }else{
      
      let dataResults = await response.json();
      alert(dataResults.status)
    }

  }

  const options = [
    { value: 'C++', label: 'C++' },
    // { value: 'two', label: 'Two', className: 'myOptionClassName' },
    // {
    //  type: 'group', name: 'group2', items: [
    //    { value: 'five', label: 'Five' },
    //    { value: 'six', label: 'Six' }
    //  ]
    // }
  ];
  
  const defaultOption = options[0];
  return <div className = {styles.solveContainer}>
    <div className = {styles.allButtons}>
    <form onSubmit={onFileSubmit} style={{display:"flex"}}>


        <div className={classNames(styles.buttonsContainer,"file has-name is-fullwidth")}>
          <label className={classNames("file-label",styles.labelContainer)}>
            <input onChange={onFileSelect} className="file-input" type="file" name="code" accept=".cpp, .py, .java" />
            <span className={classNames(styles.chooseAFile)}>
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span>
                Choose a file…
              </span>
            </span>
            <span className={styles.noFileSelected}>
              No file Selected
            </span>
          </label>

          {/* <Dropdown className={styles.selectLanguage} options={options}onChange={(e)=>{  setSelectedLang(e.value)}} value={defaultOption} placeholder="Select an option" /> */}
           {/* <div className={styles.selectLanguage}> */}
        {/* <select className={styles.selectLanguage}>
          <option value="" disabled>Select language</option>
          <option value="C++">C++</option>
          {/* <option>Python</option> */}
        {/* </select> */}
      {/* </div> */}
          {/* <Link className = { styles.submissionButton}to={"/problem/" + id + "/submissions"}> <p >{'Submissions'}</p> </Link> */}
        </div>


    </form>
    <div className = {styles.langAndSubmit}>
    <Dropdown className={styles.selectLanguage} options={options}onChange={(e)=>{  setSelectedLang(e.value)}} value={defaultOption} placeholder="Select an option" />
    <Link className = { styles.submissionButton}to={"/problem/" + id + "/submissions"}> <p >{'Submissions'}</p> </Link>
    </div>
    </div>
    {/* <hr /> */}
    
    <form className = {styles.formClass}onSubmit={codeSubmit}>
      <textarea className={styles.textarea} placeholder="Start Coding Here..." rows="10" value={sourcecode} onChange={onChangeTextArea}></textarea>

      {/* <div className="select">
        <select name="language">
          <option value="" disabled>Select language</option>
          <option value="C++">C++</option>
          <option>Python</option>
        </select>
      </div> */}

      <div className = {styles.submitButtonContainer}>
        <button className={styles.submitButton}>Submit</button>
      </div>
    </form>


  {/* Output Section */}
  <hr />
    <div>
    <h5 className="title is-5">Output</h5>
    {results.output.length == 0 ? 
      'Please submit to see the output'
    : 
        <><table className="table">
        <tbody>
          <tr><td><b>verdict : </b></td><td> {results.verdict} {results.verdict == 'ACCEPTED' ? '✅' : '❌'}</td></tr>
          <tr><td><b>status : </b></td><td> {results.status} {results.status == 'SUBMITTED' ? '✅' : '❌'} </td></tr>
        </tbody>
      </table>
      <pre>{results.output}</pre></>
    }

    </div>


  </div>
}



export default (ProblemSubmitPage)