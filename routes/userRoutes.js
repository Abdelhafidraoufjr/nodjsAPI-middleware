const express = require('express');
const router = express.Router();
const { register, login, getMe, getAllUsers, getUserById, updateUserById, headUserById } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Opérations sur les utilisateurs
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Users]
 *     summary: Créer un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.get('/protected', auth, (req, res) => {
  res.json({ message: "Accès autorisé", user: req.user });
});
router.get('/users', auth, getAllUsers);
router.get('/users/:id', auth, getUserById);
router.patch('/users/:id', auth, updateUserById);
router.head('/users/:id', auth, headUserById);


module.exports = router;