require('dotenv').config();
const jwt = require('jsonwebtoken');
const Post = require("../../model/post");

exports.delete = (req, res) => {
    const id = req.params.id;
    const data = jwt.verify(req.cookies.access_token, process.env.SECRET_KEY);

    Post.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
          });
        } else {
          res.send({
            message: "Post was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Post with id=" + id
        });
      });
  };