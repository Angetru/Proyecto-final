const express = require('express');
const router = express.Router();


const { create, findAll, findById, updateFarmaco, remove } = require('../controllers/farma.controller');

//Endpoints para farmacos
/**
 * @swagger
 * /api/farmacos:
 *   post:
 *     summary: Crear un fármaco
 *     description: Crea un fármaco con los datos proporcionados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre del fármaco
 *               description:
 *                 type: string
 *                 description: La descripción del fármaco
 *               dose:
 *                 type: string
 *                 description: La dosis del fármaco
 *               frequency:
 *                 type: string
 *                 description: La frecuencia del fármaco
 *               times:
 *                 type: string
 *                 description: Las veces que se toma el fármaco al día
 *               startdate:
 *                 type: string
 *                 description: La fecha de inicio del fármaco
 *               enddate:
 *                 type: string
 *                 description: La fecha de fin del fármaco
 *             required:
 *                - name
 *                - description
 *                - dose
 *                - frequency
 *                - times
 *                - startdate
 *                - enddate
 *     responses:
 *       200:
 *         description: Fármaco creado exitosamente
 *       500:
 *         description: Error al crear el fármaco
 * 
 * @swagger
 * /api/farmacos:
 *   get:
 *     summary: Obtener todos los fármacos
 *     description: Obtiene todos los fármacos registrados en la base de datos
 *     responses:
 *       200:
 *         description: Lista de fármacos
 *       500:
 *         description: Error obteniendo los fármacos
 * 
 * @swagger
 * /api/farmacos/{id}:
 *   get:
 *     summary: Buscar fármaco por id
 *     description: Busca un fármaco por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del fármaco
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fármaco encontrado
 *       500:
 *         description: Error buscando el fármaco
 *
 * @swagger
 * /api/farmacos/{id}:
 *   patch:
 *     summary: Actualizar fármaco
 *     description: Actualiza los campos nombre, descripción, dosis, frecuencia, veces, fecha de inicio y/o fecha de fin de un fármaco
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del fármaco
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
 *                 description: El nombre del fármaco
 *               description:
 *                 type: string
 *                 description: La descripción del fármaco
 *               dose:
 *                 type: string
 *                 description: La dosis del fármaco
 *               frequency:
 *                 type: string
 *                 description: La frecuencia del fármaco
 *               times:
 *                 type: string
 *                 description: Las veces que se toma el fármaco al día
 *               startdate:
 *                 type: string
 *                 description: La fecha de inicio del fármaco
 *               enddate:
 *                 type: string
 *                 description: La fecha de fin del fármaco
 *             required:
 *               - name
 *               - description
 *               - dose
 *               - frequency
 *               - times
 *               - startdate
 *               - enddate
 *     responses:
 *       200:
 *         description: Fármaco actualizado exitosamente
 *       404:
 *         description: Fármaco no encontrado
 *       500:
 *         description: Error actualizando el fármaco
 *  
 * @swagger
 * /api/farmacos/{id}:
 *   delete:
 *     summary: Eliminar fármaco
 *     description: Elimina un fármaco por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del fármaco
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fármaco eliminado exitosamente
 *       404:
 *         description: Fármaco no encontrado
 *       500:
 *         description: Error eliminando el fármaco
 *     
 *            
 */
router.post('/', create);
router.get('/', findAll);
router.get('/:id', findById);
router.patch('/:id', updateFarmaco);
router.delete('/:id', remove);

module.exports = router;
