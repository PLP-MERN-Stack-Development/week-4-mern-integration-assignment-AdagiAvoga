const express = require ('express');
const { body } = require('express-validator');
const {
    getCategories,
    createCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);
router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
],  createCategory);

module.exports = router;