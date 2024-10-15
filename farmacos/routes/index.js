const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const farmaRouter = require('./farma.routes');
const listaRouter = require('./lista.routes');

router.use('/users', userRouter);
router.use('/', authRouter);
router.use('/farmacos', farmaRouter);
router.use('/listas', listaRouter);

module.exports = router;



