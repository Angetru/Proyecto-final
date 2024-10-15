const Lista = require("../models/lista");

// Crear lista
const create = async (req, res) => {
    try {
        const { farmacos, categoria } = req.body; // No necesitamos obtener user del cuerpo, lo obtenemos de req.user
        const user = req.user.id; // Obtén el ID del usuario del token
        const lista = new Lista({ user, farmacos, categoria });
        const result = await lista.save();
        res.json({ message: 'Lista creada exitosamente', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la lista', error });
    }
};

// Actualizar lista
const update = async (req, res) => {
    try {
        const { farmacos, categoria } = req.body;
        const user = req.user.id; // Obtén el ID del usuario del token

        // Busca la lista y verifica que pertenezca al usuario
        const lista = await Lista.findById(req.params.id);
        if (!lista) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }
        if (lista.user.toString() !== user) {
            return res.status(403).json({ message: 'No tienes permiso para modificar esta lista' });
        }

        // Actualiza la lista
        const result = await Lista.findByIdAndUpdate(req.params.id, { farmacos, categoria }, { new: true });
        res.json({ message: 'Lista actualizada', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error actualizando la lista', error });
    }
};

// Eliminar lista
const remove = async (req, res) => {
    try {
        const lista = await Lista.findById(req.params.id);
        if (!lista) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }

        const user = req.user.id; // Obtén el ID del usuario del token
        if (lista.user.toString() !== user) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta lista' });
        }

        const result = await Lista.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lista eliminada exitosamente', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminando la lista', error });
    }
};

// Buscar las listas del usuario logueado
const findAll = async (req, res) => {
    try {
        const user = req.user.id; // Obtén el ID del usuario del token
        const result = await Lista.find({ user }); // Filtra por usuario
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo las listas', error });
    }
};

// Buscar por id de Lista
const findById = async (req, res) => {
    try {
        const resultId = req.params.id;
        const lista = await Lista.findById(resultId);
        if (!lista) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }

        const user = req.user.id; // Obtén el ID del usuario del token
        if (lista.user.toString() !== user) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta lista' });
        }

        res.json({ result: lista });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error buscando la lista', error });
    }
};

module.exports = { create, findAll, findById, update, remove };
