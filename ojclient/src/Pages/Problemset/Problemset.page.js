import React, { Component } from "react";
import { Link } from "react-router-dom";
import PagetabComponent from "../../Components/Pagetab/Pagetab.component";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";
import APIRoutes from "./../../Utils/APIRoutes.json";
import "./Problem.page.css";

let tabItemData = [
  { to: "/problemset", content: "problemset" },
  { to: "/stats", content: "statistics" },
];

function EachProblem(props) {
  let str = "";
  let keys = Object.keys(props.data.tags);
  for (let i = 0; i < keys.length; i++) {
    let x = keys[i];
    // console.log(x)
    if (i != 0) str += ",";
    str += props.data.tags[x].tagname;
  }
  return (
    <tr onClick={() => props.onClick(props.data.id)}>
      <th>{props.data.id}</th>
      <td>{props.data.title}</td>
      <td>{str}</td>
      <td> unsolved </td>
      <td>
        {" "}
        <Link to={"/problem/" + props.data.id}> Goto Problem </Link>{" "}
      </td>
    </tr>
  );
}

class ProblemsetPage extends Component {
  constructor() {
    super();
    this.state = {
      problems: [],
    };
  }

  componentDidMount() {
    document.title = "Problemset - ScalableOJ";

    this.fetchAllProblems();
  }

  selectProblem = async (problemid) => {
    console.log(problemid);
  };

  fetchAllProblems = async () => {
    let response = await fetch(
      APIRoutes.SERVER_HOST + APIRoutes.APIS.GET_ALL_PROBLEMS,
      { method: "GET" }
    );
    console.log(response);
    if (response.ok) {
      let jsonResponse = await response.json();

      this.setState((prev) => {
        return {
          ...prev,
          problems: jsonResponse,
        };
      });
    } else {
      alert("Error Loading Problems");
    }
  };

  render() {
    return (
      <PagebaseMiddleware>
        <h2 className="title is-3" style={{ margin: 0 }}>
          Problemset
        </h2>

        <PagetabComponent tabItems={tabItemData} />
        <hr />

        <table className="table problemsetpage-table is-hoverable">
          <thead>
            <tr>
              <th>
                <abbr title="ID">ID</abbr>
              </th>
              <th>Problem Title</th>
              <th>
                <abbr title="Played">Tags</abbr>
              </th>
              <th>
                <abbr title="Drawn">Status</abbr>
              </th>
              <th>
                <abbr title="Drawn">Problem Link</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.problems.length == 0 ? (
              <tr>
                <td>No Problems</td>
              </tr>
            ) : (
              <>
                {this.state.problems.map((eachProblem, eachProblemIndex) => {
                  return (
                    <EachProblem
                      key={eachProblemIndex}
                      data={eachProblem}
                      index={eachProblemIndex}
                      onClick={this.selectProblem}
                    />
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </PagebaseMiddleware>
    );
  }
}
export default ProblemsetPage;
