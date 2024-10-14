const express = require('express');
const router = express.Router();

const { create, findAll, findById, update, remove } = require('../controllers/lista.controller');

//Endpoints para lista
/**
 * @swagger
 * /api/listas:
 *   post:
 *     summary: Crear una lista
 *     description: Crea una lista con los fármacos seleccionados por el usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: El usuario que crea la lista
 *               farmacos:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   farmaco:
 *                    type: string
 *                 description: Los fármacos que contiene la lista
 *               categoria:
 *                 type: string
 *                 description: La categoría de la lista
 *             required:
 *               - user
 *               - farmacos
 *               - categoria
 *     responses:
 *       200:
 *         description: Lista creada exitosamente
 *       500:
 *         description: Error al crear la lista
 * 
 * @swagger
 * /api/listas:
 *   get:
 *     summary: Obtener todas las listas
 *     description: Obtiene todas las listas registradas en la base de datos
 *     responses:
 *       200:
 *         description: Lista de listas
 *       500:
 *         description: Error al obtener las listas
 * 
 * @swagger
 * /api/listas/{id}:
 *   get:
 *     summary: Buscar lista por id
 *     description: Busca una lista por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id de la lista
 *         schema:   
 *           type: string
 *     responses:
 *       200:
 *         description: Lista encontrada
 *       404:
 *         description: Lista no encontrada
 *       500:
 *         description: Error al buscar la lista
 * 
 * @swagger
 * /api/listas/{id}:
 *   patch:
 *     summary: Actualizar lista
 *     description: Actualiza los campos usuario, fármacos y/o categoría de una lista
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id de la lista
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: El usuario que crea la lista
 *               farmacos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     farmaco:
 *                       type: string
 *                       description: El fármaco que contiene la lista
 *                 description: Los fármacos que contiene la lista
 *               categoria:
 *                 type: string
 *                 description: La categoría de la lista
 *             required:
 *               - user
 *               - farmacos
 *               - categoria
 *     responses:
 *       200:
 *         description: Lista actualizada
 *       404:
 *         description: Lista no encontrada
 *       500:
 *         description: Error al actualizar la lista
 * 
 * @swagger
 * /api/listas/{id}:
 *   delete:
 *     summary: Eliminar lista
 *     description: Elimina una lista por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id de la lista
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista eliminada exitosamente
 *       404:
 *         description: Lista no encontrada
 *       500:
 *         description: Error al eliminar la lista              
 * 
 */
router.post('/', create);
router.get('/', findAll);
router.get('/:id', findById);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;