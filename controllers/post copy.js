const Post = require('../models/post');

exports.getPosts = (req,res) => {
  const posts = Post.find()
    .select('_id title body')
    .then((posts) => {
      res.json({posts});
    })
    .catch(err => console.log(err));
  // res.json({
  //   posts: [
  //     {title: 'hello from this post'},
  //     {title: 'hello from other post'},
  //   ]
  // });
}

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  post.save()
    .then(result => {
      res.json({
        post: result
      });
    });
  // console.log('Creating Post, ', req.body)
  // post.save((err, result) => {
  //   if(err){
  //     return res.status(400).json({
  //       error: err
  //     });
  //   }
  //   res.status(200).json({
  //     post: result
  //   });
  // })
}