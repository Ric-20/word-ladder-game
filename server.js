const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

// Expanded word dictionary (load from words.txt file)
const dictionary = fs.readFileSync("words.txt", "utf8").split("\n");

app.use(express.json());
app.use(express.static("public")); // Serve static files

// Word validation route
app.post("/validate", (req, res) => {
  const { word } = req.body;
  if (dictionary.includes(word)) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.listen(port, () => {
  console.log(`Word Ladder backend running at http://localhost:${port}`);
});
