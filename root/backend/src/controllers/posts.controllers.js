
const Post = require('../models/posts.model');

//-***********************************************************************************************

const getAllPosts = async (req, res) => {
  try {
    Post.find({}, function (err, Posts) {
      let PostMap = {};
      Posts.forEach(function (Post) {
        PostMap[Post._id] = Post;
      });
      res.status(200).json(PostMap);
    }).lean().sort();
  } catch (e) {
    res.status(404).json({ error: "Posts not found" });
  }
};

//-***********************************************************************************************

const getPostById = async (req, res) => {
  try {
    const PostFound = await Post.findById(req.params.id).sort({ date: 'desc' });
    if (!PostFound) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(PostFound);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//-***********************************************************************************************

const createPost = async (req, res) => {
  const { title, description, type, date } = req.body;
  try {
    const newPost = new Post({ title, description, type, date });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

//-***********************************************************************************************

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

//-***********************************************************************************************

const updatePost = async (req, res) => {
  const { title, description, type, date } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description, type, date });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Exports
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
};
