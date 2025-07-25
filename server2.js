// server2.js
//

const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const expressSession = require("express-session");
const session = require("express-session");

const sessionOptions = {
  secret: "hugujarati",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

app.get("/register", (req, res) => {
  let {name = "Anonymous"} = req.query;
  req.session.name = name;
  console.log(req.session.name);
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.send("Hello " + req.session.name);
});

// app.get("/reqcount", (req, res) => {
//   // if session.count exists, increment it; otherwise, set it to 1
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }

//   res.send(`Request count: ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
// res.send("test successful");
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
