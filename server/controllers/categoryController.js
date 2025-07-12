const Category = require('../models/Category');
const {validationResult } = require('express-validator');

const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

const createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const category = new Category (req.body);
    await category.save();
    res.status(201).json(category);
};

module.exports = {
    getCategories,
    createCategory,
};