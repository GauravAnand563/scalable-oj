const fs = require("fs");
const crypto = require("crypto");

// Read the problems.json file
const data = fs.readFileSync("problems.json");
const problems = JSON.parse(data);

// Generate a unique 4-digit code for each problem based on its title
let usedCodes = [];

// Create an array to store all the scores
let scores = [];

problems.forEach((problem) => {
  //   console.log(problem.title);
  problem.problems.forEach((prob) => {
    const title = prob.title;
    const hash = crypto.createHash("sha256").update(title).digest("hex");
    let code = hash.substring(0, 4).toUpperCase();
    while (usedCodes.includes(code)) {
      const newHash = crypto
        .createHash("sha256")
        .update(title + Math.random())
        .digest("hex");
      code = newHash.substring(0, 4).toUpperCase();
    }
    usedCodes.push(code);
    prob.code = code;

    // Convert score to floating point number
    const score = prob.score.split(" / ");
    prob.score = parseFloat(score[0]) / parseFloat(score[1]);
    prob.score = prob.score.toFixed(3);

    // Assign difficulty based on score
    if (prob.score > 0.827) {
      prob.difficulty = "EASY";
    } else if (prob.score < 0.569) {
      prob.difficulty = "HARD";
    } else {
      prob.difficulty = "MEDIUM";
    }
    // Add the score to the scores array
    scores.push(prob.score);
  });
});

// Write the updated data back to the problems.json file
fs.writeFileSync("problems.json", JSON.stringify(problems, null, 2));

// Write the scores to a separate text file
fs.writeFileSync("scores.txt", scores.join("\n"));
