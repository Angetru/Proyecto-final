const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");

const {
  findAll,
  findById,
  updateUser,
} = require("../controllers/user.controller");

//Endpoints para usuarios
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Buscar todos los usuarios
 *     security:
 *      - BearerAuth: []
 *     description: Busca todos los usuarios registrados en la base de datos
 *     responses:
 *      200:
 *       description: Lista de usuarios
 * 
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Buscar usuario por id
 *     security:
 *       - BearerAuth: []
 *     description: Busca un usuario por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al buscar el usuario
 * 
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar usuario
 *     security:
 *       - BearerAuth: []
 *     description: Actualiza los campos nombre, email y/o password de un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del usuario
 *         schema:
 *           type: string
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
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error actualizando el usuario
 */


router.get("/", auth, findAll);
router.get("/:id", auth, findById);
router.patch("/:id", auth, updateUser);

module.exports = router;
