const express = require('express');
const router = express.Router();


const { create, findAll, findById, updateFarmaco, remove } = require('../controllers/farma.controller');

//Endpoints para farmacos

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findById);
router.patch('/:id', updateFarmaco);
router.delete('/:id', remove);

module.exports = router;
