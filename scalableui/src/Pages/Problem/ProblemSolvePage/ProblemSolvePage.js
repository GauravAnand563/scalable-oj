import ProblemHome from "../home/ProblemHome";
import ProblemSubmitPage from "../submit/ProblemSubmit.page";
// import styles from './ProblemSolvePage.module.css'

export function ProblemSolvePage({ problemDescription, problemDetails }) {
  console.log(problemDescription);
  return (
    <div className="flex p-4 ">
      <div className="basis-2/5 h-fit">
        <ProblemHome
          problemDescription={problemDescription}
          problemDetails={problemDetails}
        />
      </div>
      <div className="basis-3/5">
        <ProblemSubmitPage problemDetails={problemDetails} />
      </div>
    </div>
  );
}
