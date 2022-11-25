const Posts = require("../schemas/post");
const Comments = require("../schemas/comment");
const express = require("express");
const router = express.Router();

router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  const comments = await Comments.find();

  const filteredData = comments.filter(
    (comment) => Number(comment.postId) === Number(postId)
  );
  if (filteredData.length) {
    res.json({
      Comments: filteredData,
    });
  } else {
    res.json({ comments: filteredData });
  }
});

router.post("/comments/:postId", async (req, res) => {
  const { content } = req.body;
  const id = req.params.postId;

  const commentsdata = await Comments.find().sort({ commentsId: -1 });
  const post = await Posts.find({ id });
  if (post.length) {
    if (content.trim() === "") {
      res.json({ Error: "The content is black" });
    } else {
      const commentsId = commentsdata.length
        ? commentsdata[0].commentsId + 1
        : 1;
      const createdComments = await Comments.create({
        commentsId: commentsId,
        postId: id,
        content: content,
      });
      res.json({ comments: createdComments });
    }
  } else {
    res.json({ Error: "Post ID did not Found" });
  }
});

router.put("/comments/:commentsId", async (req, res) => {
  const { content } = req.body;
  const { commentsId } = req.params;

  const data = await Comments.find({ commentsId: Number(commentsId) });
  if (data.length) {
    if (content.trim() !== "") {
      await Comments.updateOne(
        { commentsId: Number(commentsId) },
        { $set: { content: content } }
      );
      res.json({ Message: "Success" });
    } else {
      res.json({ Error: "Fill the input!" });
    }
  } else {
    res.json({ Error: "The data is not found" });
  }
});

router.delete("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;

  const data = await Comments.find({ commentsId: Number(commentsId) });
  if (data.length) {
    await Comments.deleteOne({ commentsId: Number(commentsId) });
    res.json({ Message: "Delete successfully" });
  } else {
    res.json({ Error: "The data is not found" });
  }
});

module.exports = router;