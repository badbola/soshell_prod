const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  //res.cookie('stark', 21);
  //console.log(req.cookies);
  // Post.find({},function(err,posts){
  //     return res.render('home', {
  //         title: 'Soshell Homepage',
  //         posts: posts
  //     });
  // });
  //populate user for each posts
  // Post.find({}).populate('user')
  // .populate({
  //     path: 'comments',
  //     populate: {
  //         path: 'user'
  //     }
  // })
  // .exec(function(err,posts){
  //     User.find({},function(err,users){
  //         return res.render('home', {
  //             title: 'Soshell Homepage',
  //             posts: posts,
  //             all_users: users
  //         });
  //     });
  // });
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes",
        },
      })
      .populate("likes");

    let users = await User.find({});

    return res.render("home", {
      title: "Soshell Homepage",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
