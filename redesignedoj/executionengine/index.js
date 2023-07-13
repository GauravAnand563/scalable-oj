'use strict';
const util = require('util');
const express = require('express');

const  exec = util.promisify(require("child_process").exec);
const fs = require('fs').promises
const bodyParser = require("body-parser")
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}



const app = express();
app.use(bodyParser.json());

app.post('/run', async (req, res) => {
  let filename = makeid(10);
  try{
	console.log("GOT Requirest\n");
    let {input, code} = req.body;
    input = Buffer.from(input, 'utf-8').toString();
    code = Buffer.from(code, 'utf-8').toString();

    let step1 = await exec(`touch tmp/${filename}.cpp`);
    // if some error happens
    if (step1.stderr) {
      throw step1.stderr;
    }
    await fs.writeFile(`tmp/${filename}.cpp`, code);

    await fs.writeFile(`tmp/${filename}.input.txt`, input);

    let step2 = await exec(`g++ tmp/${filename}.cpp -o tmp/${filename} && ./tmp/${filename} `);

    console.log(step2.stderr)

    await exec(`rm tmp/${filename}.cpp`)
    await exec(`rm tmp/${filename}.input.txt`)
    await exec(`rm tmp/${filename}`)
    res.status(200).send(step2.stdout);
  
  }catch(e){

    try{
      await exec(`rm tmp/${filename}.cpp`)
      await exec(`rm tmp/${filename}.input.txt`)
      await exec(`rm tmp/${filename}`)
    }catch(ee){

    }
    try{

      res.status(400).send(e.stderr);
    }catch(e){

      res.status(400).send(e);
    }
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
