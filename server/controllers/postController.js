const Post = require ('../models/Post');
const { validationResult } = require ('express-validator');

const getPosts = async (req, res) => {
    const posts = await Post.find().populate('category');
    res.json(posts);
};

const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({message: 'Post not found'});
    res.json(post);
};

const createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!post) return res.status(404).json ({ message: 'Post not found'});
    res.json(post);
};


const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json ({ message: 'Post deleted'});
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
