const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/userController');
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

module.exports = router;