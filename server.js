// server.js
// This file sets up an Express server with cookie handling and routes for users and posts.
// It includes functionality for reading and verifying cookies, as well as handling signed cookies.

const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

const cookieParser = require("cookie-parser");

// cookie j ne read karva ma help kare
app.use(cookieParser("secretKey"));

app.get("/greet", (req, res) => {
  // jo cookie ma "name"  nam ni cookie hase to aeni value "name " ma save kari dese.
  // jo cookie ma "name" ni value nathi to "anonymous" set kari dese.
  // req.cookies thi cookie ne read kari dese.
  let { name = "anonymous" } = req.cookies;
  res.send(`Hello ${name}!`);
});


// ----------------------------------------------------------------------
//  signed cookie
// cookie ne signed karva this khabar pade k e cookie user dvara change karva ma aavi che k ny

app.get("/signedcookie", (req, res) => {
  res.cookie("made-in", "India", { signed: true });
  res.send("Signed cookie route accessed!");
});


// req.signedCookies thi signed cookie ne read kari dese.
// a signed cookie ne verify karva ma aave che k e user dvara change to
// nathi kari gayi.
// agar change kari gayi to e cookie read nathi thase.
// aetle resulat ma {} aavse athva jo false pn aavi sake che.
// jo key and value banne aave to j cookie same to same che.
app.get("/verifySignedCookie", (req, res) => {
  console.log(req.signedCookies);
  res.send("Signed cookie verified!");
});

// ----------------------------------------------------------------------
app.get("/getcookie", (req, res) => {
  res.cookie("greet", "hello");
  res.cookie("Try", "login");
  res.send("Cookie route accessed!");

  //cookie ne print karva mate
  // or read karva mate
  console.log(req.cookies);
});

app.get("/", (req, res) => {
  res.send("Welcome to Root!");
});

app.listen(3030, () => {
  console.log("Server is running on port 3030");
});

app.use("/users", users);
app.use("/posts", posts);
