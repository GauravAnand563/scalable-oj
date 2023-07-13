import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import APIRoutes from "./../../../Utils/APIRoutes.json";
import { codeSamples, languages } from "./ProblemExamples";
function ProblemSubmitPage(props) {
  let { id } = useParams();

  // State Variables
  const [language, setLanguage] = useState("cpp");
  let [results, setResults] = useState({
    output: "",
    status: "",
    submission: "",
    verdict: "",
  });
  let [sourcecode, setSourcecode] = useState(codeSamples[language]);
  let [problem, setProblem] = useState({});

  // Editor Appearance State Variables
  const [editorTheme, setEditorTheme] = useState(
    localStorage.getItem("editorTheme")
      ? localStorage.getItem("editorTheme")
      : "vs"
  );
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Handlers
  const handleLanguageDropdownChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleEditorThemeToggle = (e) => {
    if (e.target.checked) {
      setEditorTheme("vs-dark");
    } else {
      setEditorTheme("vs");
    }
  };

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  useEffect(() => {
    localStorage.setItem("editorTheme", editorTheme);
  }, [editorTheme]);

  useEffect(() => {
    setProblem(props.problemDetails);
  }, [sourcecode]);

  useEffect(() => {
    setSourcecode(codeSamples[language]);
  }, [language]);

  useEffect(() => {
    setProblem(props.problemDetails);
    // setSuperCount(count * 2);
  }, [props.problemDetails]);

  // On File Change
  let onFileSelect = (e) => {
    let fr = new FileReader();
    fr.readAsText(e.target.files[0]);
    fr.onload = () => {
      setSourcecode(fr.result);
    };
    // Based on the file type, set the language
    let fileExtension = e.target.files[0].name.split(".").pop();
    console.log(fileExtension);
    switch (fileExtension) {
      case "cpp":
        setLanguage("cpp");
        break;
      case "py":
        setLanguage("python");
        break;
      case "java":
        setLanguage("java");
        break;
      case "js":
        setLanguage("javascript");
        break;
      case "dart":
        setLanguage("dart");
        break;
      case "rs":
        setLanguage("rust");
        break;
      case "go":
        setLanguage("go");
        break;
      case "php":
        setLanguage("php");
        break;
      case "sh":
        setLanguage("shell");
        break;
      case "c":
        setLanguage("cpp");
        break;
      default:
        setLanguage("cpp");
        break;
    }
  };

  // On File Submit
  let onFileSubmit = (e) => {
    e.preventDefault();
  };

  // Code submit
  let codeSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(
      APIRoutes.SERVER_HOST + APIRoutes.APIS.SUBMIT_PROBLEM,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "text/plain",
          problemcode: problem.problemcode,
          language: "C++",
        },
        body: sourcecode,
      }
    );

    if (response.ok) {
      let dataResults = await response.json();
      setResults({
        output: dataResults.output,
        status: dataResults.status,
        submission: dataResults.submission,
        verdict: dataResults.verdict,
      });
    } else {
      let dataResults = await response.json();
      // alert(dataResults.status);
    }
  };

  return (
    <div className="mr-4">
      <div className="flex pb-3">
        <form onSubmit={onFileSubmit} style={{ display: "flex" }}>
          <input
            onChange={onFileSelect}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs mr-4"
            name="code"
            accept=".cpp, .py, .java, .txt, .js, .dart, .rs, .go, .php, .sh, .c"
          />
        </form>
        <select
          className="select select-bordered w-full max-w-xs ml-4 mr-8"
          defaultValue="Select Language"
          placeholder="Select Language"
          value={language}
          onChange={handleLanguageDropdownChange}
        >
          <option selected disabled>
            Select Language
          </option>
          {languages.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          className="btn btn-outline"
          href={"/problem/" + id + "/submissions"}
        >
          {" "}
          <p>{"Submissions"}</p>{" "}
        </button>
      </div>
      <form onSubmit={codeSubmit}>
        <div className="relative">
          <div className="absolute top-0 right-0 mt-2 mr-5 rounded-md  p-1 flex bg-base-100 items-center justify-center opacity-20 transition-opacity duration-200 hover:opacity-100 focus:outline-none z-50">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={handleEditorThemeToggle}
                // show toggle image based on localstorage theme
                checked={editorTheme === "vs" ? false : true}
              />
              <svg
                className="swap-on fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          <Editor
            height="65vh" // By default, it fully fits with its parent
            theme={editorTheme}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              // cursorSmoothCaretAnimation: "on",
            }}
            language={language}
            loading={<ClockLoader />}
            value={sourcecode}
            onChange={(value, event) => {
              setSourcecode(value);
            }}
            editorDidMount={handleEditorDidMount}
          />
          {/* Open the modal using ID.showModal() method */}
          {/* <button className="btn" onClick={() => window.my_modal_2.showModal()}>
            open modal
          </button>
          <dialog id="my_modal_2" className="modal h-screen w-screen">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click outside to close</p>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog> */}
        </div>
        <div>
          <div className="grid grid-cols-2 my-2">
            <button
              className="btn btn-outline basis-1/2 mr-4 "
              onClick={(e) => {
                setSourcecode(codeSamples[language]);
              }}
              type="reset"
            >
              Reset
            </button>
            <button className="btn btn-success basis-1/2 ml-4 ">Submit</button>
          </div>
        </div>
      </form>
      <hr />
      <div>
        <h5 className="title is-5">Output</h5>
        {results.output.length == 0 ? (
          "Please submit to see the output"
        ) : (
          <>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <b>verdict : </b>
                  </td>
                  <td>
                    {" "}
                    {results.verdict}{" "}
                    {results.verdict == "ACCEPTED" ? "✅" : "❌"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>status : </b>
                  </td>
                  <td>
                    {" "}
                    {results.status}{" "}
                    {results.status == "SUBMITTED" ? "✅" : "❌"}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
            <pre>{results.output}</pre>
          </>
        )}
      </div>
    </div>
  );
}

export default ProblemSubmitPage;
