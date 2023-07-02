import React from "react"
import styles from './ProblemHome.module.css'
import classNames from 'classnames'
import parse from 'html-react-parser';
function ProblemHome(props){
    console.log(props?.problemDetails?.constraints)
   
    return <div className = {styles.problemPage}>
        {/* <pre className = 'page'> */}
        <h6 className = {styles.problemTitle}><b>{props?.problemDetails?.title}</b></h6>
        <p className = {styles.problemText}>{props?.problemDescription}</p>
        <h4 className = {styles.problemConstraintsText}><b>Constraints</b></h4>
        <p className = {styles.problemText}>{props?.problemDetails?.constraints}</p>
        <h4 className = {styles.problemConstraintsText}><b>Test Cases</b></h4>

        {props?.problemDetails?.testcases.map((testcase)=>{
            const inputText = testcase?.input?.split("\n")
            const outputText = testcase?.output?.split("\n")
            return(
                <div className = 'mt-5'>
                    <p className = {styles.inputOutputText}>Input</p>
                     <p id = 'test'className = {styles.problemText}> {inputText.map((inp)=>{
                        return<p>{inp}</p>
                     })}</p>
                     <p className = {styles.inputOutputText}>Output</p>
                     <p id = 'test'className = {styles.problemText}> {outputText.map((out)=>{
                        return<p>{out}</p>
                     })}</p>
                </div>
                
            )
        })}
        
        {/* <p className = {styles.problemText}>{props?.problemDetails?.}</p> */}
    
        {/* </pre> */}
    </div>
}
export default ProblemHome