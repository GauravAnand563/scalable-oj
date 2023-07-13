const puppeteer = require("puppeteer");

async function scrapeProblems() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://cses.fi/problemset/");

  const problems = [];

  const contentDiv = await page.$(".content");
  Array.from(page.querySelectorAll("h2")).map((heading) => {
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

  console.log(problems);
  browser.close();
  return problems;
}

scrapeProblems()
  .then((problems) => {
    console.log(problems);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
