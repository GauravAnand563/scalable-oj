import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";
import APIRoutes from "./../../Utils/APIRoutes.json";
import "./Home.page.css";
// import {useEffect} from 'react'
import { Chip } from "@react-md/chip";
import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BsFillXCircleFill } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend);

let tabItemData = [
  // {to:"/", content: 'Home'  },
  { to: "/contests", content: "Contests" },
  { to: "/problemset", content: "Problems" },
  { to: "/about", content: "About" },
  { to: "/createproblem", content: "Create Problem" },
];

// function EachProblem(props){
//   let str = ""
//   let keys = Object.keys(props.data.tags)
//   for(let i=0; i < keys.length; i++){
//     let x = keys[i]
//     // console.log(x)
//     if(i != 0 ) str += ','
//     str += props.data.tags[x].tagname
//   }
//   return <tr onClick={()=> props.onClick(props.data.id)}>
//     <th>{props.data.id}</th>
//     <td>{props.data.title}</td>
//     <td>{str}</td>
//     <td> unsolved </td>
//     <td> <Link to={"/problem/"+props.data.id}> Goto Problem </Link> </td>
//   </tr>
// }

export const chartData = {
  labels: ["Solved", "Tried", "Not Tried"],
  datasets: [
    {
      label: "# of Votes",
      data: [2, 1, 30],
      backgroundColor: ["#B8A7EA", "#FF6666", "#A8D793"],

      borderWidth: 2,
    },
  ],
};
const allTags = [
  { value: "loop", key: "loop" },
  { value: "dp", key: "dp" },
  { value: "array", key: "array" },
  { value: "string", key: "string" },
  { value: "greedy", key: "greedy" },
  { value: "graph", key: "graph" },
];

function HomePage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isTagApplied, setIsTagApplied] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  // const doughtnutData = {
  //     // labels: [],
  //     // labels: ['Cash', 'UPI', 'Cheque', 'Bank Card'],
  //     datasets: [
  //       {
  //         data: [55000, 25000, 15000, 5000],
  //         backgroundColor: ['#A8D793', '#FF6666', '#82CFB3', '#B8A7EA'],
  //         hoverBackgroundColor: ['#A8D793', '#FF6666', '#82CFB3', '#B8A7EA'],
  //         borderWidth: 2,
  //       },
  //     ],
  //   }
  useEffect(() => {
    // For declaring Title
    document.title = "Home - ScalableOJ";
  });

  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#D6E6F2",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  createTheme("dark", {
    background: {
      default: "transparent",
    },
  });

  useEffect(() => {
    axios
      .get(APIRoutes.SERVER_HOST + APIRoutes.APIS.GET_ALL_PROBLEMS)
      .then((response) => {
        console.log(response);
        setRows(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (search != "") {
      const result = rows?.filter((r) => {
        return r?.title?.toLowerCase().match(search.toLowerCase());
      });
      setFilteredData(result);
    } else {
      setFilteredData(rows);
    }
  }, [search]);

  // console.log(rows)
  const columns = [
    { name: "Problem Id", selector: (row) => row.id, sortable: true },
    {
      name: "title",
      selector: (row) => row.title,
      wrap: true,
      sortable: true,
    },
    {
      name: "Problem Code",
      selector: (row) => row.problemcode,
      wrap: true,
    },
    {
      name: "Difficulty",
      selector: (row) => row.difficulty,
      wrap: true,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Link className="buttonClass" to={"/problem/" + row.id}>
          {" "}
          Solve{" "}
        </Link>
      ),
    },
  ];

  const onChipClick = (props) => {
    console.log(props);

    let chipFilterData = [];
    rows.forEach((row) => {
      let check = 0;
      row.tags.forEach((tag) => {
        if (tag.tagname === props) {
          check = 1;
        }
      });
      if (check === 1) {
        chipFilterData.push(row);
      }
    });

    setFilteredData(chipFilterData);
    setIsTagApplied(true);
    setSelectedTag(props);
    // setFilteredData(chipFilterData)
  };

  return (
    <PagebaseMiddleware>
      <div className="homePageContainer">
        <h4 className="homePageText">Home Page</h4>
        <hr />
        <div className="blogsAndTable">
          <div className="tableContainer">
            <DataTable
              theme="solarized"
              id="tab"
              title="Problems"
              columns={columns}
              data={filteredData}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="700px"
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  className="searchBoxClass"
                  type="text"
                  placeholder=" Search Problems"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              }
              subHeaderAlign="left"
            />
          </div>
          <div className="blogsSection">
            <div className="doughnutGraph">
              <Pie data={chartData} />
            </div>
            <h4 className="filterTagsText">Filter Tags</h4>

            <div className="alltags">
              {allTags.map((tag) => {
                return (
                  <div className="chipsContainer">
                    <Chip
                      onClick={() => onChipClick(tag.value)}
                      className="chipClass"
                      id={tag.value}
                    >
                      {tag.value}{" "}
                    </Chip>
                    {selectedTag === tag.value && (
                      <BsFillXCircleFill
                        onClick={() => {
                          setFilteredData(rows);
                          setSelectedTag("");
                        }}
                        className="crossIcon"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PagebaseMiddleware>
  );
}
export default HomePage;
