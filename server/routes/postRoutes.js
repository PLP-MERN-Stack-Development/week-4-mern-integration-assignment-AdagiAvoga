const express = require ('express');
const { body } = require('express-validator');
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
],  createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;