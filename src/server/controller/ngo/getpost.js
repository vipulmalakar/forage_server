require('dotenv').config();
const Post = require("../../model/post");

exports.posts = async(req,res) =>{
    try{
        Post.find({}, function(err, foundPosts){
            if(foundPosts){
                res.json(foundPosts);
            }else{
                res.send(err);
            }
        });
    }catch(err){
        console.log(err);
    }
}