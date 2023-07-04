import React, { useEffect, useState } from "react";
import PagebaseMiddleware from "../../Middlewares/Pagebase/Pagebase.middleware";
// import "./CreateProblem.page.css";
import classNames from "classnames";
import Multiselect from "multiselect-react-dropdown";
import styles from "./CreateProblem.page.module.css";

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
  difficulty: "EASY",
  score: 1,
  tags: [],
  testcases: [{ input: "", output: "" }],
};

function CreateProblemPage() {
  let [formState, setFormState] = useState(emptyForm);
  const [selectedTag, setSelectedTag] = useState("loop");
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
  // const onTagChange = (event) =>{
  //     setSelectedTag(event.value)
  //     setFormState((prev)=>{
  //         return {
  //             ...prev, ["tags"]: [...prev.tags, event.value]
  //         }
  //     })
  // }
  // let getAllTags = async ()=>{
  //     try{
  //         let response = await fetch(APIRoutes.SERVER_HOST+APIRoutes.APIS.GET_ALL_TAGS)
  //         let data = await response.json()
  //         console.log(data)
  //         let myData = data.map(()=>{
  //                 return({
  //                     value:data.tagname,
  //                     label:data.tagname
  //                 })
  //         })
  //         setTagOptions(data)
  //         setAllTags(data)
  //     }catch(e){
  //         alert(e)
  //     }
  // }

  // useEffect(()=>{
  //     getAllTags()
  // },[]);
  useEffect(() => {
    console.log(formState);
  }, [formState]);

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
      alert(JSON.stringify(data));
    } else {
      let data = await response.json();
      alert(JSON.stringify(data));
    }
  };
  useEffect(() => {
    // For declaring Title
    document.title = "Create Problem - ScalableOJ";
  }, []);

  return (
    <PagebaseMiddleware>
      <div className={styles.createProblemPageContainer}>
        <h2 className={classNames("title is-3", styles.createProblemTitle)}>
          Create Problem Page
        </h2>
        {/* <PagetabComponent tabItems={tabItemData} /> */}
        <hr />
        <form onSubmit={formSubmit}>
          <div className={styles.problemCodeAndTitle}>
            <div class="field">
              <label class="label">Problem Code *</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  minLength={1}
                  placeholder="Enter Problem Code"
                  name="problemcode"
                  defaultValue={formState.problemcode}
                  required
                  onChange={inputChange}
                />
                {/* <small>Without space</small> */}
              </div>
            </div>

            <div class="field">
              <label class="label">Problem Title *</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  minLength={1}
                  placeholder="Problem Title"
                  name="title"
                  defaultValue={formState.title}
                  required
                  onChange={inputChange}
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Difficulty *</label>
              <div class="control">
                <div class="select">
                  <select
                    required
                    name="difficulty"
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
            {/* 
                   <div class="field">
                        <label class="label">Tags</label>
                        <div class="control">
                            <div class="select is-multiple">
                                <select  multiple name="tags" onChange={inputChange} defaultValue={ formState.tags }>
                                    <option>Select Tags</option>
                                    {allTags.map((eachTag, eachindex)=>{
                                        return <option key={eachindex} value={String(eachTag.tagname).toUpperCase()}> { eachTag.tagname} </option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div> */}

            {/* <Multiselect
                    displayValue="key"
                    onKeyPressFn={function noRefCheck(){}}
                    onRemove={(event)=>{
                        let myTags = event.map((e)=>{
                            return e.value
                        })
                    
                        setFormState((prev)=>{
                        return {
                            ...prev, ["tags"]: myTags
                        }
                    })
                    }}
                    //   onSearch={(event)=>{console.log(event)}}
                    onSelect={(event)=>{   
                        let myTags = event.map((e)=>{
                            return e.value
                        })
                    
                        setFormState((prev)=>{
                        return {
                            ...prev, ["tags"]: myTags
                        }
                    })}}
                    options={allTags}
                    /> */}

            <div class="field mb-3">
              <label class="label">Score *</label>
              <div class="control">
                <input
                  className={styles.problemScore}
                  type="number"
                  placeholder="Please Enter Score "
                  min="1"
                  max="4"
                  defaultValue={formState.constraints}
                  required
                  name="score"
                  onChange={inputChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.descriptionAndTags}>
            <div className={styles.description}>
              <label class="label">Problem Description *</label>
              <div class="control">
                <textarea
                  class="textarea"
                  minLength={1}
                  placeholder="Problem Description ... (Including Sample testcases here)"
                  defaultValue={formState.description}
                  required
                  name="description"
                  onChange={inputChange}
                ></textarea>
              </div>
            </div>

            <div className={styles.constraints}>
              <label class="label">Constraints*</label>
              <div className={styles.constraintsTextArea}>
                <input
                  className={styles.constraintsTextArea}
                  type="text"
                  minLength={1}
                  name="constraints"
                  defaultValue={formState.constraints}
                  required
                  onChange={inputChange}
                />
              </div>
            </div>

            {/*             
            <div class="field">
                <label class="label">Score *</label>
                <div class="control">
                    <input className="input" type="number" placeholder="Please Enter Score " min="1" max="4" defaultValue={ formState.score } required name="score" onChange={inputChange} />
                </div>
            </div> */}
            <div className={styles.tags}>
              <label class="label">Select Label *</label>
              <Multiselect
                className={styles.multiselect}
                displayValue="key"
                onKeyPressFn={function noRefCheck() {}}
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
                //   onSearch={(event)=>{console.log(event)}}
                onSelect={(event) => {
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
                options={allTags}
              />
            </div>
          </div>

          <div className="subtitle">
            <div className={styles.addTestCasesContainer}>
              <label class="label ml-1">Input Testcases *</label>
              <div className="control ml-1 mb-2">
                <button
                  className={styles.addTestCases}
                  type="button"
                  onClick={addTestcase}
                >
                  Add Testcase
                </button>
              </div>
              {formState.testcases.map((eachtestcase, eachindex) => {
                return (
                  <>
                    <div
                      className=""
                      style={{
                        border: "1px solid #dedede",
                        borderRadius: "5px",
                        padding: "20px",
                        margin: "5px",
                      }}
                    >
                      <h3 className="subtitle is-3"> Testcase {eachindex}</h3>

                      <div class="control">
                        <div className="label">Input {eachindex}</div>
                        <textarea
                          class="textarea"
                          minLength={1}
                          placeholder="Input here"
                          required
                          name="input"
                          defaultValue={eachtestcase.input}
                          onChange={(e) => onTestcaseInputChange(e, eachindex)}
                        ></textarea>
                      </div>
                      <div class="control">
                        <div className="label">Output {eachindex}</div>
                        <textarea
                          class="textarea"
                          minLength={1}
                          placeholder="Output Here"
                          required
                          name="output"
                          defaultValue={eachtestcase.output}
                          onChange={(e) => onTestcaseInputChange(e, eachindex)}
                        ></textarea>
                      </div>
                      <br />
                      <button
                        className={styles.deleteButton}
                        onClick={() => removeTestcase(eachindex)}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div class="field is-grouped ml-6">
            <div class="control ml-6">
              <button className={styles.createProblemButton}>
                Create Problem Now
              </button>
            </div>
            <div class="control">
              <button className={styles.deleteButton} type="reset">
                Reset
              </button>
            </div>
          </div>
        </form>

        <br />
        <br />
      </div>
    </PagebaseMiddleware>
  );
}
export default CreateProblemPage;
