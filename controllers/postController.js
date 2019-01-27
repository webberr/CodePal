const db = require('../models');

const target = db.ThreadPost;

module.exports = {
  createPost: function(req, res) {
    console.log(req.body, req.params.id);
    target
      .create(req.body)
      .then(dbPost => {
        console.log(dbPost);
        return db.ForumThread.findByIdAndUpdate(
          req.params.id,
          { $push: { posts: dbPost._id } },
          { new: true }
        );
      })
      .then(dbThread => res.json(dbThread))
      .catch(err => console.log(err));
  },
  editPost: function(req, res) {
    target
      .findByIdAndUpdate(req.params.id, req.body)
      .then(dbPost => res.json(dbPost))
      .catch(err => console.log(err));
  },
  deletePost: function(req, res) {
    target
      .findByIdAndDelete(req.params.id)
      .then(dbPost => res.json(dbPost))
      .catch(err => console.log(err));
  },
  getOnePost: function(req, res) {
    target
      .findById(req.params.id)
      .then(dbPost => res.json(dbPost))
      .catch(err => console.log(err));
  }
};
