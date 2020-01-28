const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We don't serve that here. Never call again!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get("/test", (req, res) => {
  res.send("the change has been seen");
});

// problem 1
app.get("/sum", (req, res) => {
  let params = parseInt(req.query.a) + parseInt(req.query.b);
  res.send(`The sum of a and b is ${params}`);
});

// problem 2
app.get("/cipher", (req, res) => {
  const texty = req.query.texty;
  const shifty = req.query.shifty;

  if (!texty) {
    return res.status(400).send("Please provide text");
  }
  if (!shifty) {
    return res.status(400).send("Please provide shift");
  }

  let arr = [];

  let arr2 = [];

  for (let i = 0; i < texty.length; i++) {
    arr.push(texty.charCodeAt(i));
  }

  let arr1 = arr.map(x => x + parseInt(shifty));

  for (let i = 0; i < arr1.length; i++) {
    arr2.push(String.fromCharCode(arr1[i]));
  }

  const arr3 = arr2.join("");
  res.send(arr3);
});

app.get("/lotto", (req, res) => {
  const { arr } = req.query;
  let nums = [];
  let matches = 0;
  let response = {
    text: "",
    numMatches: matches
  };

  // generate random lotto numbers
  for (let i = 0; i < 6; i++) {
    nums.push(Math.floor(Math.random() * (+21 - +1)) + +1);
  }

  // loop through the lotto numbers one by one and check to see if it is equal to any of the query nums
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (parseInt(arr[i]) == parseInt(nums[j])) {
        console.log(`${parseInt(arr[i])} matches ${parseInt(nums[j])}!`);
        matches += 1;
      }
    }
  }

  // handle each case for how many matches we get
  switch (matches) {
    case 0:
    case 1:
    case 2:
    case 3:
      response.text = "Sorry, you lose";
      break;
    case 4:
      response.text = "Congratulations, you win a free ticket";
      break;
    case 5:
      response.text = "Congratulations! You win $100!";
      break;
    case 6:
      response.text =
        "Wow! Unbelievable! You could have won the mega millions!";
  }
  res.send(`There were ${matches} matches. ${response.text}`);
});

//Response data
app.get("/hello", (req, res) => {
  res.status(204).send("Here is some information");
});

//send an object in json format
app.get("/video", (req, res) => {
  const video = {
    title: "Cats falling over",
    description: "15 minutes of hilarious fun as cats fall over",
    length: "15.40"
  };
  res.json(video);
});

app.get("/colors", (req, res) => {
  const colors = [
    {
      name: "red",
      rgb: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "0000FF"
    }
  ];
  res.json(colors);
});

app.get("/grade", (req, res) => {
  // get the mark from the query
  const { mark } = req.query;

  // do some validation
  if (!mark) {
    // mark is required
    return res.status(400).send("Please provide a mark");
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    // mark must be a number
    return res.status(400).send("Mark must be a numeric value");
  }

  if (numericMark < 0 || numericMark > 100) {
    // mark must be in range 0 to 100
    return res.status(400).send("Mark must be in range 0 to 100");
  }

  if (numericMark >= 90) {
    return res.send("A");
  }

  if (numericMark >= 80) {
    return res.send("B");
  }

  if (numericMark >= 70) {
    return res.send("C");
  }

  res.send("F");
});
