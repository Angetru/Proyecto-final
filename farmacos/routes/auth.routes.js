const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Registro de usuario
 *     description: Registra un usuario en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre del usuario
 *               email:
 *                 type: string
 *                 description: El email del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *               username:
 *                 type: string
 *                 description: El nombre de usuario del usuario
 *             required:
 *               - name
 *               - email
 *               - password
 *               - username
 *     responses:
 *       200:
 *         description: Usuario creado con éxito
 *       500:
 *         description: Error al registrar el usuario
 * 
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Inicio de sesión
 *     description: Inicia sesión en la aplicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *             required:
 *               - username   
 *               - password       
 *     responses:   
 *       200:
 *         description: Inicio de sesión exitoso
 *       500:
 *         description: Error al iniciar sesión del usuario
 * 
*/
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;

