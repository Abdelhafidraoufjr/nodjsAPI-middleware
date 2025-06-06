const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.create({email, password});
        res.status(201).json({message: 'Utilisateur cree', user: {email: user.email}}); 
    } catch(err){
        res.status(400).json({message: 'Erreur creation utilisateur', error: err.message});        
    }
};

exports.login = async(req, res) =>{
    const {email, password} =req.body;
    const user = await User.findOne({email});
    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({message: "Identifiant invalides"});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.json({token})
};

exports.getMe = async (req, res) =>{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};