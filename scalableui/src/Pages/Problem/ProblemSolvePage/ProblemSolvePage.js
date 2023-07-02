import ProblemHome from "../home/ProblemHome";
import ProblemSubmitPage from "../submit/ProblemSubmit.page";
import styles from './ProblemSolvePage.module.css'


export  function ProblemSolvePage({problemDescription,problemDetails})
{
    console.log(problemDescription)
    return(
        <div className = {styles.problemPageContainer}>
        <ProblemHome problemDescription={problemDescription} problemDetails = {problemDetails} />
        <ProblemSubmitPage problemDetails = {problemDetails} />
        </div>
    )
}