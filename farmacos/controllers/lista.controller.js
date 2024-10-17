const Lista = require("../models/lista");
const Farmaco = require("../models/farmaco");

// Crear lista
const create = async (req, res) => {
    try {
      const { categoria, farmacos } = req.body;
  
      // Verifica que los fármacos sean un array de IDs y que el usuario esté autenticado
      if (!Array.isArray(farmacos)) {
        return res.status(400).json({ message: 'El campo farmacos debe ser un array de IDs' });
      }
  
      // Crea la nueva lista
      const nuevaLista = await Lista.create({
        categoria,
        farmacos,  // Array de ObjectIds de fármacos
        user: req.user.id  // Asegúrate de tener el ID del usuario en req.user.id
      });
  
      res.json({ message: 'Lista creada exitosamente', nuevaLista });
    } catch (error) {
      console.error('Error creando lista:', error);
      res.status(500).json({ message: 'Error creando la lista', error });
    }
  };

//Envio de alertas via mail a usuario
const sendAlert = async (req, res) => {
    const { id } = req.params;

    try {
      await sendEmailToUser(req.user.email, `Alerta para la lista ${id}`);
  
      res.status(200).json({ message: 'Alerta enviada con éxito' });
    } catch (error) {
      console.error('Error enviando alerta:', error);
      res.status(500).json({ message: 'Error enviando alerta' });
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
      const listas = await Lista.find().populate('farmacos');  // Poblar los fármacos con sus detalles
      res.json({ listas });
    } catch (error) {
      console.error('Error obteniendo las listas:', error);
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

module.exports = { create, sendAlert, findAll, findById, update, remove };
