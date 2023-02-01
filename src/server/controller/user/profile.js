require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../../model/user");

exports.profile = async (req, res) =>{
    try{
        const data = jwt.verify(req.cookies.access_token, process.env.SECRET_KEY);
        const personId = data.user_id;

        User.find({ personId }, function(err, foundUser){
            if(foundUser){
                const {first_name, last_name, contact, email} = foundUser[0];
                res.json({
                    name:first_name+" "+last_name,
                    contact:contact,
                    email:email,
                    karma_count:3,
                    account_status:"Activated"
                });
            }else{
                res.send(err);
            }
        });

        
    }catch(err){
        console.log(err);
    }
}

exports.updateProfile = async (req, res) =>{
    try{
        const data = jwt.verify(req.cookies.access_token, process.env.SECRET_KEY);
        const personId = data.user_id;

        User.find({ personId }, function(err, foundUser){
            if(foundUser){
                const {first_name, last_name, contact, email} = foundUser[0];
                
            }else{
                res.send(err);
            }
        });

        
    }catch(err){
        console.log(err);
    }
}