import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PagetabComponent from "../../Components/Pagetab/Pagetab.component";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";
// import "./Home.page.css";
import APIRoutes from "./../../Utils/APIRoutes.json";
import { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
// import {useEffect} from 'react'
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Chip } from "@react-md/chip";
import { BsFillXCircleFill } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend);

let tabItemData = [
  // {to:"/", content: 'Home'  },
  { to: "/contests", content: "Contests" },
  { to: "/problemset", content: "Problems" },
  { to: "/about", content: "About" },
  { to: "/createproblem", content: "Create Problem" },
];

function toCamelCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
function HomePage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [isTagApplied, setIsTagApplied] = useState(false);
  const [allTags] = useState([]);
  useEffect(() => {
    document.title = "Home - Scalable OJ";
  });

  useEffect(() => {
    axios
      .get(APIRoutes.SERVER_HOST + APIRoutes.APIS.GET_ALL_TAGS)
      .then((response) => {
        console.log(response);
        response.data.forEach((tag) => {
          let check = 0;
          allTags.forEach((t) => {
            if (t.value === toCamelCase(tag.tagname)) {
              check = 1;
            }
          });
          if (check === 0)
            allTags.push({
              value: toCamelCase(tag.tagname),
              key: tag.tagname,
            });
        });
      });
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
        <div className="p-4 flex">
          <div className="mr-4 py-3 rounded-2xl basis-2/3">
            <div className="tabs tabs-boxed mb-2">
              {allTags.map((tag) => (
                <a
                  key={tag.value}
                  className={`tab mr-2 ${
                    selectedTag === tag.value ? "tab-active" : ""
                  }`}
                  onClick={() => {
                    if (selectedTag === tag.value) {
                      setFilteredData(rows);
                      setSelectedTag("");
                      return;
                    }
                    return onChipClick(tag.value);
                  }}
                  id={tag.value}
                >
                  {tag.value}
                  {selectedTag === tag.value && (
                    <span className="ml-2 z-40">
                      <BsFillXCircleFill
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("clicked" + tag.value);
                          setFilteredData(rows);
                          setSelectedTag("");
                        }}
                      />
                    </span>
                  )}
                </a>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Problem Id</th>
                    <th>Title</th>
                    <th>Problem Code</th>
                    <th>Difficulty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.title}</td>
                      <td>{row.problemcode}</td>
                      <td>{row.difficulty}</td>
                      <td>
                        <Link className="buttonClass" to={"/problem/" + row.id}>
                          Solve
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="blogsSection basis-1/3 rounded-2xl bg-slate-400">
            <div className="doughnutGraph">
              <Pie data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </PagebaseMiddleware>
  );
}

export default HomePage;
