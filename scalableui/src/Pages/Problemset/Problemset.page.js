import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomePage from "../Home/Home.page";
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
  // let navigate = useNavigate();

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
    return <HomePage />;
  }
}
export default ProblemsetPage;
