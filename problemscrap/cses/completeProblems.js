const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://cses.fi/problemset/task/2428");

  // Get problem name
  const name = await page.$eval("h1", (el) => el.textContent);

  // Get problem description
  var description = await page.$eval('input[name="task"]', (input) => {
    function getNodeHTML(node) {
      let html = "";

      if (node.nodeType === Node.TEXT_NODE) {
        html += node.textContent;
      } else {
        html += `<${node.tagName.toLowerCase()}`;

        for (const attr of node.attributes) {
          html += ` ${attr.name}='${attr.value}'`;
        }

        html += ">";

        for (const childNode of node.childNodes) {
          html += getNodeHTML(childNode);
        }

        html += `</${node.tagName.toLowerCase()}>`;
      }

      return html;
    }

    let text = "";
    let node = input;

    while (node) {
      if (node.id === "constraints" || node.id === "example") {
        break;
      }

      text += getNodeHTML(node);
      node = node.nextSibling;
    }

    // Replace src attribute of img tags with full URL
    text = text.replace(/src='\/(.*?)'/g, `src='https://cses.fi/$1'`);

    // Replace all instances of \n with a space character
    text = text.replace(/\n/g, " ");

    // Remove consecutive <br> tags
    text = text.replace(/(<br><\/br>)+/g, "<br>");
    text = text.replace(/(<br> )+/g, "<br>");

    return text.toString();
  });

  // description = description.replace(/\\/g, "");

  // Get constraints
  // const constraintsSection = await page.$("#constraints");

  // let constraintsHtml = "";
  // let nextNode = constraintsSection.nextSibling;
  // console.log(nextNode);
  // while (nextNode) {
  //   if (nextNode.id === "example") {
  //     break;
  //   }

  //   constraintsHtml += getSiblingHTML(nextNode);
  //   nextNode = nextNode.nextSibling;
  // }
  // const constraints = constraintsHtml;

  const constraints = await page.$eval("#constraints", (el) => {
    function getSiblingHTML(node) {
      let html = "";

      if (node.nodeType === Node.TEXT_NODE) {
        html += node.textContent;
      } else {
        html += `<${node.tagName.toLowerCase()}`;

        for (const attr of node.attributes) {
          html += ` ${attr.name}='${attr.value}'`;
        }

        html += ">";

        for (const childNode of node.childNodes) {
          html += getSiblingHTML(childNode);
        }

        html += `</${node.tagName.toLowerCase()}>`;
      }

      return html;
    }
    let constraintsHtml = "";
    let nextNode = el.nextSibling;
    console.log(nextNode);
    while (nextNode) {
      if (nextNode.id === "example") {
        break;
      }

      if (nextNode.tagName === "BR") {
        nextNode = nextNode.nextSibling;
        continue;
      }

      constraintsHtml += getSiblingHTML(nextNode);
      nextNode = nextNode.nextSibling;
    }
    constraintsHtml = constraintsHtml.replace(/\n/g, " ");

    // Remove consecutive <br> tags
    constraintsHtml = constraintsHtml.replace(/(<br><\/br>)+/g, "<br>");
    constraintsHtml = constraintsHtml.replace(/(<br> )+/g, "<br>");
    return constraintsHtml;
  });

  // Split input and output
  const testCases = [];
  for (let i = 0; i < examples.length; i += 2) {
    testCases.push({
      input: examples[i],
      output: examples[i + 1],
    });
  }

  // Get explanation
  const explanation = await page.$eval(
    ".content :last-child",
    (el) => el.textContent
  );

  const problem = { name, description, constraints, testCases, explanation };

  // Save problem to JSON file
  fs.writeFileSync("temp.json", JSON.stringify(problem));

  await browser.close();
})();
