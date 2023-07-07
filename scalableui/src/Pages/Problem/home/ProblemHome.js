import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// import styles from './ProblemHome.module.css'
import { BiCopyAlt } from "react-icons/bi";
function ProblemHome(props) {
  console.log(props?.problemDetails?.constraints);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mr-4 p-8 rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-30 bg-base-200 flex flex-col h-full">
      <h6 className="text-center text-4xl mb-8">
        <b>{props?.problemDetails?.title}</b>
      </h6>
      <p className="text-justify">{props?.problemDescription}</p>
      <h4 className="text-2xl my-4">
        <b>Constraints</b>
      </h4>
      <p className="">{props?.problemDetails?.constraints}</p>
      <h4 className="text-2xl my-4">
        <b>Test Cases</b>
      </h4>
      {/* 
      {props?.problemDetails?.testcases.map((testcase) => {
        const inputText = testcase?.input?.split("\n");
        const outputText = testcase?.output?.split("\n");
        return (
          <div className="mt-5">
            <p className="">Input</p>
            <p id="test" className="">
              {" "}
              {inputText.map((inp) => {
                return <p>{inp}</p>;
              })}
            </p>
            <p className="">Output</p>
            <p id="test" className="">
              {" "}
              {outputText.map((out) => {
                return <p>{out}</p>;
              })}
            </p>
          </div>
        );
      })}
       */}

      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <div className="overflow-x-auto px-2">
          <TabList className="flex gap-2 my-4">
            {props?.problemDetails?.testcases.map((_, index) => (
              <Tab
                key={index}
                className={`relative btn ${
                  activeTab === index ? "bg-green-500 text-white" : ""
                } border-none`}
              >
                Test Case {index + 1}
              </Tab>
            ))}
          </TabList>
        </div>
        <div className="">
          {props?.problemDetails?.testcases.map((eachtestcase, index) => (
            <TabPanel key={index}>
              <div className="relative mb-2">
                <label className="label">
                  <p className="label-text">Input</p>
                </label>
                <article className="textarea w-full">
                  {eachtestcase.input}
                </article>
                <button
                  className="absolute top-0 right-0 mt-2 mr-1 rounded-full w-6 h-6 flex items-center justify-center opacity-20 transition-opacity duration-200 hover:opacity-100 focus:outline-none"
                  onClick={() =>
                    handleCopyClick(
                      props?.problemDetails?.testcases[activeTab].input
                    )
                  }
                >
                  <BiCopyAlt />
                </button>
              </div>
              <div className="relative">
                <label className="label">
                  <p className="label-text">Output</p>
                </label>
                <article className="textarea w-full">
                  {eachtestcase.output}
                </article>
                <button
                  className="absolute top-0 right-0 mt-2 mr-1 rounded-full w-6 h-6 flex items-center justify-center opacity-20 transition-opacity duration-200 hover:opacity-100 focus:outline-none"
                  onClick={() =>
                    handleCopyClick(
                      props?.problemDetails?.testcases[activeTab].output
                    )
                  }
                >
                  <BiCopyAlt />
                </button>
              </div>
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
export default ProblemHome;
