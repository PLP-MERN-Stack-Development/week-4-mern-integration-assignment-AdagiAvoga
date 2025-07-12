const User = require('../models/User');
const bcrypt =require ('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);
        const user = new User ({ username, email, password: hashed});
        await user.save();

        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed '});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne ({ email });
        if(!user) return res.status(401).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Wrong password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: 'Login failed '});
    }
};

module.exports = { register, login };