const express = require('express');
const router = express.Router();
const Posts = require('../schemas/post');


router.get('/posts', async (req, res) => {
    const posts = await Posts.find().sort({ createdAt: -1 })
    
    res.json({ data: posts })
});

router.post('/posts', async (req, res) => {
    const { title, user, password, content } = req.body;
    const data = await Posts.find().sort({ createdAt: -1});
    const postId = data.length ? data[0].postId + 1 : 1;
    const createdPosts = await Posts.create({
        postId:postId, title:title, user:user, password:password, content:content
    });
    res.json({ posts: createdPosts });

    

});

router.get('/post/search/:key', async (req, res, next) => {
    let filteredPosts = await Posts.find ({
        $or: [
            {user: { $regex: req.params.key }},
            { title: { $regex: req.params.key }},
            { content: { $regex: req.params.key }},
        ]
    })
    res.json({ filteredPosts});
});

router.put('/post/:postId', async (req, res,) => {
    const { postId } = req.params;
    const quantity = req.body;
  
    const existsPosts = await Posts.find({ postId: Number(postId) });
    if (existsPosts.length) {
        if ( existsPosts[0].password === req.body.password ) {
            await Posts.updateOne({ postId: Number(postId) }, { $set: { title: quantity.title, user: quantity.user, content: quantity.content } });
            res.json({ success: "Data has change"});
        } else {
            res.json({failed: "Password is Wrong"});
        }
    } else { 
        res.json({failed: "Data not found"});
    };
})

router.delete('/post/:postId', async (req, res,) => {
    const { postId } = req.params;
  
    const existsPosts = await Posts.find({ postId: Number(postId) });
    if (existsPosts.length) {
        if ( existsPosts[0].password === req.body.password ) {
            await Posts.deleteOne({ postId: Number(postId) });
            res.json({ success: "Data has delete"});
        } else {
            res.json({failed: "Password is Wrong"});
        }
    } else { 
        res.json({failed: "Data not found"});
    };
})

module.exports = router;