const express = require("express");
const app = express();
const pokemon = require("./models/pokemon.json");

app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});
app.get("/bugs", (req, res) => {
  const toSend = `<h1>99 little bugs in the code</h1><a href="/bugs/101">pull one down,patch it around</a>`;
  res.send(toSend);
});

app.get("/bugs/:numOfBugs", (req, res) => {
  const num = req.params.numOfBugs;
  const toSend = `${num} little bugs in the code<a href="/bugs/${
    +num + 2
  }">Pull one down, patch it around</a>`;
  if (num >= 200) {
    res.send('<a href="/bugs">Too many bugs!! Start over!</a>)');
  }
  res.send(toSend);
});

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  const name = req.query.name;
  const found =
    pokemon.find((poke) => poke.name.toLowerCase() === name.toLowerCase()) ||
    [];
  res.send(found);
});

app.get("/pokemon/:indexOfArray", (req, res) => {
  const index = req.params.indexOfArray;
  if (!pokemon[index]) {
    res.send(`Sorry, no pokemon found at ${index}`);
  }
  res.send(pokemon[index]);
});

app.get("/:verb/:adjective/:noun", (req, res) => {
  const { verb, adjective, noun } = req.params;
  res.send(
    `Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`
  );
});

module.exports = app;