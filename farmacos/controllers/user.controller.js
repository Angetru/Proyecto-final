const User = require('../models/user');

//buscar todos los usuarios
const findAll = async (req, res) => {
    try{
        const users= await User.find({});
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error obteniendo los usuarios', error});
    }
}
//buscar por id de usuario
const findById = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error buscando el usuario', error });
    }
}

//Actualizar usuario campos nombre, email y/o password
const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const {name, email, password} = req.body;

        //Campos permitidos para actualizar
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = password;
        
        // Verificar si hay algún dato para actualizar
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No hay campos válidos para actualizar' });
        }
        // Buscar el usuario y actualizar solo los campos permitidos
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado exitosamente', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error actualizando el usuario', error });
    }

}
module.exports = { findAll, findById, updateUser };