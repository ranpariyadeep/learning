// server2.js
//

const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const path = require('path');
const ejs = require("ejs");


const session = require("express-session");
// The connect-flash module is used to implement flash messages 
// temporary, session-based messages for user feedback
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOptions = {
  secret: "hugujarati",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
//
app.use(flash());

app.use((req, res, next) => {
  //local variable to pass data to the view
 //we can use same variable name in the view
 res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let {name = "Anonymous"} = req.query;
  req.session.name = name;
  console.log(req.session.name);

  if (name === "Anonymous") {
    req.flash("error", "Please provide a name");
  }else {
  req.flash("success", "user registered successfully");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
 
 
 res.render("page.ejs",{name: req.session.name});
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
