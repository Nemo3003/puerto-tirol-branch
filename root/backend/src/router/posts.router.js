
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {
    getAllposts, 
    getpostById, 
    createpost, 
    updatepost, 
    deletepost,
    newpost,
    seeposts,
    editpost,
    seeEdition,
    deletepostNew
} = require('../controllers/posts.controllers');
const {isAuthenticated} = require('../helpers/authChecker');

// posts
router.get('/', isAuthenticated,getAllposts);

//Renders the form to create a new post
router.get('/posts/add', isAuthenticated,(req,res)=>{
    res.render('../views/posts/new-post')
})
// This will post the new post to the database while sending error messages if necessary
router.post('/new-post', isAuthenticated,newpost)
//Renders the list of the posts added
router.get('/posts-added',isAuthenticated, seeposts)

//Renders the edit form for the posts
router.get('/posts/edit/:id', isAuthenticated,seeEdition)

//Sends the new posts modified
router.put('/posts/edit-post/:id',isAuthenticated,editpost)
//Deletes the post
router.delete('/posts/delete/:id',isAuthenticated, deletepostNew)

router.get('/:id',isAuthenticated, getpostById);

router.post('/', isAuthenticated,createpost)

router.put('/:id', isAuthenticated,updatepost);

router.delete('/:id',isAuthenticated, deletepost);


// Exports
module.exports = router;