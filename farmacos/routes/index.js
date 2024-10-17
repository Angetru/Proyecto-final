const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const farmaRouter = require('./farma.routes');
const listaRouter = require('./lista.routes');
const auth = require("../middleware/authorization");

router.use('/', authRouter);

router.use('/users', auth, userRouter);
router.use('/farmacos', farmaRouter);
router.use('/listas', auth, listaRouter);

module.exports = router;



