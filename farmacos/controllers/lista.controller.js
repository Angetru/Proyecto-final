const Lista = require("../models/lista");
const Farmaco = require("../models/farmaco");

// Crear lista
const create = async (req, res) => {
    try {
      const { user, categoria, farmacos } = req.body;
  
    // Crea una nueva lista con los datos recibidos
    const nuevaLista = new Lista({
      user,
      farmacos,
      categoria,
    });

    // Guarda la lista en la base de datos
    await nuevaLista.save();

    res.status(201).json(nuevaLista); // Devuelve la lista creada
  } catch (error) {
    console.error('Error creando la lista:', error);
    res.status(500).json({ message: 'Error creando la lista' });
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
        const result = await Lista.findByIdAndUpdate(req.params.id, { farmacos, categoria }, { new: true })
            .populate('farmacos', 'name');

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
      const listas = await Lista.find({ user: req.user.id })
        .populate('farmacos', 'name') // Llena con los fármacos y solo devuelve el campo 'name'
        .exec();

      res.status(200).json({ listas });
    } catch (error) {
      console.error('Error obteniendo las listas:', error);
      res.status(500).json({ message: 'Error obteniendo las listas', error });
    }
  };

// Buscar por id de Lista
const findById = async (req, res) => {
  try {
      const resultId = req.params.id;
      const lista = await Lista.findById(resultId).populate('farmacos', 'name'); // llena con fármacos
      if (!lista) {
          return res.status(404).json({ message: 'Lista no encontrada' });
      }

      const user = req.user.id; // Obtiene ID del usuario del token
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
