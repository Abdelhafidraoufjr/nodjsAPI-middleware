const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nom, prenom, username, genre, age, email, password } = req.body;
    try {
        const user = await User.create({ nom, prenom, username, genre, age, email, password });
        res.status(201).json({
            message: 'Utilisateur créé',
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (err) {
        res.status(400).json({ message: 'Erreur création utilisateur', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Identifiants invalides" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
};

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json(user);
    } catch {
        res.status(400).json({ message: "ID invalide" });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        }).select('-password');
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json({ message: "Utilisateur mis à jour", user });
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
};

exports.headUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).end();
        res.status(200).end();
    } catch {
        res.status(400).end();
    }
};
