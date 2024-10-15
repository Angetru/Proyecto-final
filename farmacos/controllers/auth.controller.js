const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const signUp = async (req, res) => {
    try{
        const {name, username, password, email } = req.body;
        const salt = await bcryptjs.genSalt(parseInt(process.env.SALT || 10));
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({
            name,
            username,
            password: hashedPassword,
            email,
        });
        res.status(201).json({message: 'Usuario creado con éxito', newUser});

    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al registrar el usuario', error});
    }
};

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Data recibida');

        if (!username || !password) {
            return res.status(400).json({ message: 'Usuario y password son requeridos' });
        }
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: 'Credenciales incorrectas'});
        }
        const passwordCorrect = await bcryptjs.compare(password, user.password);
        if(!passwordCorrect){
            return res.status(400).json({message: 'Credenciales incorrectas'});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login de usuario exitoso', token });
    } catch (error) {
        console.error('Error en Login', error);
        res.status(500).json({ message: 'Error en Login', error });
    }
};

module.exports = { signUp, signIn};