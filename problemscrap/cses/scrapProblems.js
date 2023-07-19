const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeProblems() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://cses.fi/problemset/");

  const problem_json = await page.evaluate(() => {
    const problems = [];
    Array.from(document.querySelectorAll("h2")).map((heading) => {
      const problem = {};
      problem.title = heading.innerText;
      problem.problems = [];

      const children = heading.nextElementSibling;
      Array.from(children.querySelectorAll("ul > li")).map((link) => {
        const problemLink = {};
        Array.from(link.querySelectorAll("a")).map((anchor) => {
          problemLink.title = anchor.innerText;
          problemLink.url = anchor.href;
        });
        Array.from(link.querySelectorAll("span.detail")).map((spans) => {
          problemLink.score = spans.innerText;
        });
        problem.problems.push(problemLink);
      });

      problems.push(problem);
    });

    return JSON.stringify(problems);
  });
  browser.close();

  fs.writeFile("problems.json", problem_json, (err) => {
    if (err) throw err;
    console.log("Problems saved to problems.json");
  });
}

scrapeProblems()
  .then((problems) => {
    console.log(problems);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
