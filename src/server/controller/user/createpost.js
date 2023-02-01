require('dotenv').config();
const jwt = require('jsonwebtoken');
const Post = require("../../model/post");

exports.createPost = async (req, res) =>{
    try{
        const data = jwt.verify(req.cookies.access_token, process.env.SECRET_KEY);
        const { contact, address, quantity, description} = req.body;

        const post = await Post.create({
            email: data.email,
            contact,
            address,
            quantity,
            description
        });
        res.json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
}