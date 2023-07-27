//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Post = require('../models/Post');

//-***********************************************************************************************

const getAllPosts = async (req, res) => {
  try{
  Post.find({}, function(err, Posts) {
    let PostMap = {};
    Posts.forEach(function(Post) {
      PostMap[Posts._id] = Post;
    });
    res.status(200).send(PostMap);  
  }).lean().sort();}
  catch(e){
    res.status(404).send(e)
  }
};

const seePosts = async (req,res)=>{
  const Posts = await Post.find({user: req.user.id})
  .lean()
  .sort({date: 'desc'});
  res.render('../views/posts/all-posts.hbs', { Posts });
}

//-***********************************************************************************************

const getPostById = async (req, res) => {
  const PostFound = await Post.findById(req.params.id).sort({date: 'desc'})
    res.json(PostFound)
};

//-***********************************************************************************************

const createPost = async (req, res) => {
  
  const {title, description, type, price, engine, platform, classification} = req.body;
    try{
    const newPost = new Post(
      {title, description, type, price, engine, platform, classification});
        await newPost.save();
        res.status(200).json(newPost)
    }
    catch(e){
      res.status(500).json(e)
    }
};

const newPost = async(req,res) => {
  const{title,description,type,price, engine, platform, classification} = req.body;
  const errors = [];
  if(!title){errors.push({text: 'Incert title!'});}
  if(!description){errors.push({text: 'Incert description!'});}
  if(!type){errors.push({text: 'Incert type!'});}
  if(!price){errors.push({text: 'Incert price!'});}
  if(!engine){errors.push({text: 'Incert engine!'});}
  if(!platform){errors.push({text: 'Incert platform!'});}
  if(!classification){errors.push({text: 'Incert classification!'});}
  if(errors.length >0){
      res.render('../views/posts/new-Post', {
          errors,
          title,
          description,
          type,
          price,
          engine,
          platform,
          classification
      });
  }
  try{
  const newPost = new Post({title, description, type, price, engine, platform, classification});
  //Shows only the Posts created by that user in particular
  newPost.user = req.user.id;
  await newPost.save()
  req.flash('success_msg', 'Post added successfully')
  res.status(200).redirect('/app/app/posts/posts-added')
}
catch(e){
  req.flash('error_msg', 'Post has not been added successfully')
  res.status(500).redirect('/app/app/posts/posts-added')
}

}

//-***********************************************************************************************

const deletePost = async (req, res) => {
  try{
  await Post.findByIdAndDelete(req.params.id);
    //res.redirect('/');
    res.status(201)
  }catch(err){
    res.status(500).send(err)
  }}

const deletePostNew = async (req, res)=> {
  await Post.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Post has been deleted successfully')
  res.redirect('/app/app/posts/posts-added');
}

//-***********************************************************************************************

const updatePost = async (req, res) => {
  const {title, description, type, price, engine, platform, classification} = req.body;
  try{
    const PostEdited = await Post.findByIdAndUpdate(req.params.id, 
      {title, description, type, price, engine, platform, classification});
    //res.redirect('/')
    res.status(200).json(PostEdited)
  }
  catch (e){
    res.status(500).json(e)
  }
};

const editPost = async (req,res)=>{
  const {title, description, type, price, engine, platform, classification} = req.body;
  await Post.findByIdAndUpdate(req.params.id, {title, description, type, price,engine, platform, classification});
  req.flash('success_msg', 'Post has been updated successfully')
  res.redirect('/app/app/posts/posts-added')
}

const seeEdition = async (req,res)=>{
  const Postsi = await Post.findById(req.params.id).lean()
  res.render('../views/posts/edit-post.hbs', {Postsi})
}

// Exports
module.exports = { 
   getAllPosts,
   getPostById, 
   createPost,
   deletePost,
   updatePost,
   newPost,
   seePosts,
   editPost,
   seeEdition,
   deletePostNew
  };