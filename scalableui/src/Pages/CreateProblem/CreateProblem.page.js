import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// import "./CreateProblem.page.css";
// import  "./CreateProblem.page.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FiX } from "react-icons/fi";

import APIRoutes from "./../../Utils/APIRoutes.json";
let tabItemData = [
  { to: "/", content: "Home" },
  { to: "/contests", content: "Contests" },
  { to: "/problemset", content: "Problems" },
  { to: "/about", content: "About" },
];

let defaultForm = {
  title: "rre",
  problemcode: "ergfret",
  description: "egrtg",
  difficulty: "EASY",
  score: 4,
  tags: ["DP"],
  testcases: [{ input: "sf", output: "df" }],
};
let emptyForm = {
  title: "",
  problemcode: "",
  description: "",
  constraints: "",
  difficulty: "EASY",
  score: 1,
  tags: [],
  testcases: [{ input: "", output: "" }],
};

function CreateProblemPage() {
  let navigate = useNavigate();
  let [formState, setFormState] = useState(emptyForm);
  const [selectedTag, setSelectedTag] = useState("loop");
  const [multiselect_clicked, setMultiselect_clicked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [isError, setIsError] = useState(false);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  // let [allTags, setAllTags] = useState([]);
  // const[tagOptions,setTagOptions] = useState([])

  const allTags = [
    { value: "loop", key: "loop" },
    { value: "dp", key: "dp" },
    { value: "array", key: "array" },
    { value: "string", key: "string" },
    { value: "greedy", key: "greedy" },
    { value: "graph", key: "graph" },
  ];
  console.log(formState);

  let handleMultiselectClick = () => {
    setMultiselect_clicked(true);
    setTimeout(() => {
      setMultiselect_clicked(false);
    }, 2000);
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  let resetForm = () => {
    setFormState(emptyForm);
  };

  let inputChange = (e) => {
    console.log(e.target.name);
    let key = e.target.name;
    let val = e.target.value;
    if (key == "tags") {
      setFormState((prev) => {
        return {
          ...prev,
          [key]: [...prev.tags, val],
        };
      });
      return;
    } else {
      setFormState((prev) => {
        return { ...prev, [key]: val };
      });
    }
  };

  let addTestcase = () => {
    setFormState((prev) => {
      return {
        ...prev,
        testcases: [...formState.testcases, { input: "", output: "" }],
      };
    });
  };
  let removeTestcase = (index) => {
    setFormState((prev) => {
      let arr = [];
      formState.testcases.forEach((element, idx) => {
        if (idx != index) {
          arr.push(element);
        }
      });
      return {
        ...prev,
        testcases: arr,
      };
    });
  };
  let onTestcaseInputChange = (e, index) => {
    let key = e.target.name;
    let value = e.target.value;
    if (key == "input") {
      setFormState((prev) => {
        let arr = [];
        prev.testcases.forEach((element, ei) => {
          if (ei == index) {
            arr.push({ input: value, output: element.output });
          } else {
            arr.push(element);
          }
        });

        return {
          ...prev,
          testcases: arr,
        };
      });
      return;
    }
    if (e.target.name == "output") {
      setFormState((prev) => {
        let arr = [];
        prev.testcases.forEach((element, ei) => {
          if (ei == index) {
            arr.push({ input: element.input, output: value });
          } else {
            arr.push(element);
          }
        });

        return {
          ...prev,
          testcases: arr,
        };
      });
      return;
    }
  };

  let formSubmit = async (e) => {
    e.preventDefault();
    if (formState.testcases.length == 0) {
      alert("Please Fill all the testcases");
      return;
    }
    let text = JSON.stringify(formState);
    let response = await fetch(
      APIRoutes.SERVER_HOST + APIRoutes.APIS.CREATE_PROBLEM,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: text,
      }
    );
    if (response.ok) {
      let data = await response.json();
      setFormState(emptyForm);
      navigate("/", { state: { problem_state: "success" } });
    } else {
      let data = await response.json();
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  };

  const handleNewTag = () => {
    let myTags = [...formState.tags, "new-tag"];
    setFormState({
      ...formState,
      tags: myTags,
    });
  };
  useEffect(() => {
    // For declaring Title
    document.title = "Create Problem - ScalableOJ";
  }, []);

  return (
    <div>
      {isError && (
        <div className="flex flex-row mx-4 mt-2 items-center justify-start bg-red-400 p-4 rounded-lg">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="flex text-black items-baseline">
            <h3 className="font-bold mx-3 ">Error Submitting Problem!</h3>
            <div className="text-xs">
              Something went wrong, please try again.
            </div>
          </div>
        </div>
      )}
      <div className="flex p-4 items-center justify-center">
        <div className="mx-8 my-2 p-8 rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-30 bg-base-200 flex flex-col h-full">
          <form onSubmit={formSubmit} autoComplete="off">
            <h2 className="text-center text-4xl mb-8">Create Problem</h2>

            <div className="grid grid-cols-4 gap-8">
              <div className="">
                <label className="label">
                  <p className="label-text">Problem Code *</p>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  minLength={1}
                  placeholder="Enter Problem Code"
                  name="problemcode"
                  defaultValue={formState.problemcode}
                  required
                  onChange={inputChange}
                />
              </div>

              <div className="">
                <label className="label">
                  <p className="label-text">Problem Score *</p>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="number"
                  placeholder="Please Enter Score"
                  min="1"
                  max="4"
                  defaultValue={formState.score}
                  required
                  name="score"
                  onChange={inputChange}
                />
              </div>

              <div className="">
                <label className="label">
                  <p className="label-text">Problem Title *</p>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  minLength={1}
                  placeholder="Problem Title"
                  name="title"
                  defaultValue={formState.title}
                  required
                  onChange={inputChange}
                />
              </div>

              <div className="">
                <label className="label">
                  <p className="label-text">Problem Difficulty *</p>
                </label>
                <div className="">
                  <select
                    required
                    name="difficulty"
                    className="select select-bordered w-full max-w-xs"
                    onChange={inputChange}
                    defaultValue={formState.difficulty}
                  >
                    <option disabled unselectable="true">
                      Select Difficulty Level
                    </option>
                    <option value={"EASY"}>Easy</option>
                    <option value={"MEDIUM"}>Medium</option>
                    <option value={"HARD"}>Hard</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="">
                <label className="label">
                  <p className="label-text">Problem Description *</p>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  minLength={1}
                  placeholder="Write the problem description here"
                  defaultValue={formState.description}
                  required
                  name="description"
                  onChange={inputChange}
                ></textarea>
              </div>

              <div className="">
                <label className="label">
                  <p className="label-text">Problem Constraints *</p>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  minLength={1}
                  placeholder="Write the constraints of the problem here"
                  defaultValue={formState.constraints}
                  required
                  name="constraints"
                  onChange={inputChange}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-8 mt-8">
              <div className="col-span-3">
                <label className="label">
                  <p className="label-text">Problem Testcases *</p>
                </label>
                <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
                  <div className="overflow-x-auto">
                    <TabList className="flex gap-2 my-4">
                      {formState.testcases.map((_, index) => (
                        <Tab
                          key={index}
                          className={`relative btn ${
                            activeTab === index ? "bg-green-500 text-white" : ""
                          } border-none`}
                        >
                          Test Case {index + 1}
                          <button
                            className={`absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-${
                              activeTab === index ? 100 : 0
                            } transition-opacity duration-200 hover:opacity-100 focus:outline-none`}
                            onClick={() => removeTestcase(index)}
                          >
                            <FiX className="text-sm" />
                          </button>
                        </Tab>
                      ))}
                      <button
                        className="btn text-white font-bold py-2 px-4 rounded-xl text-xl focus:outline-none"
                        onClick={(event) => {
                          event.preventDefault();
                          addTestcase();
                        }}
                      >
                        <AiOutlinePlus />
                      </button>
                    </TabList>
                  </div>
                  <div className="">
                    {formState.testcases.map((eachtestcase, index) => (
                      <TabPanel key={index}>
                        <div className="mb-4">
                          <label className="label">
                            <p className="label-text">Input *</p>
                          </label>
                          <textarea
                            className="textarea textarea-bordered w-full"
                            minLength={1}
                            placeholder={
                              "Input here for Test Case " + (index + 1)
                            }
                            required
                            name="input"
                            value={eachtestcase.input}
                            onChange={(e) => onTestcaseInputChange(e, index)}
                          ></textarea>
                        </div>
                        <div>
                          <label className="label">
                            <p className="label-text">Output *</p>
                          </label>
                          <textarea
                            className="textarea textarea-bordered w-full"
                            minLength={1}
                            placeholder={
                              "Output here for Test Case " + (index + 1)
                            }
                            required
                            name="output"
                            value={eachtestcase.output}
                            onChange={(e) => onTestcaseInputChange(e, index)}
                          ></textarea>
                        </div>
                      </TabPanel>
                    ))}
                  </div>
                </Tabs>
              </div>

              <div className="col-span-1">
                <label className="label">
                  <p className="label-text">Problem Labels *</p>
                </label>
                <Multiselect
                  style={{
                    chips: {
                      cursor: "pointer",
                      padding: "8px",
                      borderRadius: "5px",
                      backgroundColor: "#5d6e91",
                    },
                    searchBox: {
                      maxWidth: "20rem",
                      "border-opacity": "0.2",
                      "padding-left": "1rem",
                      "padding-right": "1rem",
                      "font-size": "1rem",
                      "line-height": "2",
                      "line-height": "1.5rem",
                      "border-opacity": "0.2",
                      "border-width": "1px",
                      outline: multiselect_clicked
                        ? "2px solid #5d6e91"
                        : "none",
                      outlineOffset: multiselect_clicked ? "2px" : "0",
                    },
                    multiselectContainer: {
                      color: "#5d6e91",
                    },
                    option: {
                      backgroundColor: "#222831",
                      padding: "0.5rem",
                    },
                  }}
                  displayValue="key"
                  onRemove={(event) => {
                    let myTags = event.map((e) => {
                      return e.value;
                    });

                    setFormState((prev) => {
                      return {
                        ...prev,
                        ["tags"]: myTags,
                      };
                    });
                  }}
                  onSelect={(event) => {
                    handleMultiselectClick();
                    let myTags = event.map((e) => {
                      return e.value;
                    });

                    setFormState((prev) => {
                      return {
                        ...prev,
                        ["tags"]: myTags,
                      };
                    });
                  }}
                  disablePreSelectedValues={true}
                  closeOnSelect={true}
                  placeholder="Select Tags"
                  onSearch={(query) => {
                    // if query is not found in tags then add an option to add new tag
                    console.log(query);
                    if (!allTags?.includes(query)) {
                      allTags.push({ value: query, key: query });
                    }
                  }}
                  options={allTags}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 my-8">
              <button
                className="btn btn-outline basis-1/2 mr-4 "
                onClick={resetForm}
                type="reset"
              >
                Reset
              </button>
              <button className="btn btn-success basis-1/2 ml-4 ">
                Create Problem Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateProblemPage;
