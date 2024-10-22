const express = require('express');
const router = express.Router();

const { create, sendAlert, findAll, findById, update, remove} = require('../controllers/lista.controller');
const auth = require("../middleware/authorization");

//Endpoints para lista

router.post('/', auth, create);
router.get('/', auth, findAll);
router.get('/:id', auth, findById);
router.patch('/:id', auth, update);
router.delete('/:id', auth, remove);
router.post('/:id/alerta', sendAlert);

module.exports = router;