import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { default as React, useEffect, useState } from "react";
import { AiOutlineCode } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";
import APIRoutes from "../../Utils/APIRoutes.json";
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
  const location = useLocation();
  const navigate = useNavigate();
  const loginState = location.state && location.state.login_state;

  useEffect(() => {
    if (loginState === "success") {
      setTimeout(() => {
        navigate("/", { replace: true, state: undefined });
      }, 2000);
    }
  }, [loginState, navigate]);

  const [rows, setRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [isTagApplied, setIsTagApplied] = useState(false);
  const [allTags] = useState([]);
  const [problemStatus, setProblemStatus] = useState({
    solved: [],
    attempted: [],
    unsolved: [],
  });

  useEffect(() => {
    document.title = "Home - Scalable OJ";
  });

  useEffect(() => {
    axios
      .get(APIRoutes.SERVER_HOST + APIRoutes.APIS.STATS_USER, {
        withCredentials: true,
      })
      .then((response) => {
        setProblemStatus(response.data);
      })
      .catch((error) => {
        // setProblemStatus(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(APIRoutes.SERVER_HOST + APIRoutes.APIS.GET_ALL_TAGS)
      .then((response) => {
        // console.log(response);
        response.data.forEach((tag) => {
          let check = 0;
          allTags.forEach((t) => {
            if (t.value === tag.tagname) {
              check = 1;
            }
          });
          if (check === 0)
            allTags.push({
              value: tag.tagname,
              key: tag.tagname,
            });
        });
      });
  }, []);

  useEffect(() => {
    axios
      .get(APIRoutes.SERVER_HOST + APIRoutes.APIS.GET_ALL_PROBLEMS)
      .then((response) => {
        // console.log(response);
        setRows(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   if (search != "") {
  //     const result = rows?.filter((r) => {
  //       return r?.title?.toLowerCase().match(search.toLowerCase());
  //     });
  //     setFilteredData(result);
  //   } else {
  //     setFilteredData(rows);
  //   }
  // }, [search]);

  const onChipClick = (props) => {
    // console.log(props);

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

  const classRow = (row, ps) => {
    if (ps && ps.solved && ps.attempted) {
      return ps.solved.includes(row.problemcode)
        ? "bg-green-200 text-black"
        : ps.attempted.includes(row.problemcode)
        ? "bg-red-200 text-black"
        : "";
    }
    return "";
  };

  return (
    <PagebaseMiddleware>
      <div className="homePageContainer">
        {loginState === "success" && (
          <div className="flex flex-row mx-4 mt-2 items-center justify-start bg-emerald-400 p-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex text-black items-baseline">
              <h3 className="font-bold mx-3 ">Login Successfull!</h3>
              <div className="text-xs">
                You may now start solving the problems
              </div>
            </div>
          </div>
        )}

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
                  {toCamelCase(tag.value)}
                  {selectedTag === tag.value && (
                    <span className="ml-2 z-40">
                      <BsFillXCircleFill
                        onClick={(e) => {
                          e.stopPropagation();
                          // console.log("clicked" + tag.value);
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
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Problem Id</th>
                    <th>Problem Code</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((row) => (
                    <tr key={row.id}>
                      <td className={`${classRow(row, problemStatus)}`}>
                        {row.id}
                      </td>
                      <td className={`${classRow(row, problemStatus)}`}>
                        {row.problemcode}
                      </td>
                      <td className={`${classRow(row, problemStatus)}`}>
                        {row.title}
                      </td>

                      <td className={`${classRow(row, problemStatus)}`}>
                        {row.difficulty}
                      </td>
                      <td className={` ${classRow(row, problemStatus)}`}>
                        <a
                          className="link-hover flex flex-row items-center"
                          href={"/problem/" + row.id}
                        >
                          Solve
                          {
                            // add a link icon
                            <AiOutlineCode className="hover:text-green-500 text-xl ml-2" />
                          }
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="blogsSection basis-1/3 rounded-2xl bg-slate-400">
            {/* <div className="doughnutGraph">
              <Pie data={chartData} />
            </div> */}
            {/* <div className="">
              <button className="btn" onClick={handleStatus}>
                Problem Status
              </button>
              <hr />
              {problemStatus}
            </div> */}
            <div>
              <h2>Solved:</h2>
              <ul>
                {problemStatus?.solved?.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>

              <h2>Attempted:</h2>
              <ul>
                {problemStatus?.attempted?.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>

              <h2>Unsolved:</h2>
              <ul>
                {problemStatus?.unsolved?.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PagebaseMiddleware>
  );
}

export default HomePage;
