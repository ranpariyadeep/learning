const express = require("express");
const router = express.Router();
//Posts
// Index - posts 
router.get("/", (req, res) => {
  res.send("GET for index Posts");
})   

//Show - posts

router.get("/:id", (req, res) => {
  res.send(`GET for show posts id`);
});

//POST - posts
router.post("/", (req, res) => {
  res.send(`POST for  posts`);
});

//DELETE - posts
router.delete("/:id", (req, res) => {
  res.send(`DELETE for posts id`);
});

module.exports = router;