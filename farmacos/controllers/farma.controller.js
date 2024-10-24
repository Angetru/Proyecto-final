const Farmaco = require("../models/farmaco");

//Crear farmaco
const create = async (req, res) => {
    try {
    const { name, description, dose, frequency, times, startdate, enddate } = req.body;
    const nuevoFarmaco = await Farmaco.create({name, description, dose, frequency, times, startdate, enddate});
    res.json({ nuevoFarmaco });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al crear el farmaco', error});
    }
}

//buscar todos los farmacos
const findAll = async (req, res) => {
    try {
        console.log('Solicitud recibida para obtener todos los farmacos'); // Log de verificación
        const farmacos = await Farmaco.find({});
        console.log('Fármacos obtenidos:', farmacos); // Verifica si la consulta devuelve resultados
        res.json({ farmacos });
    } catch (error) {
        console.error('Error obteniendo los fármacos:', error); // Log del error
        res.status(500).json({ message: 'Error obteniendo los farmacos', error });
    }
};

//buscar por id de farmaco
const findById = async (req, res) => {
    try{
        const farmacoId = req.params.id;
        const farmaco = await Farmaco.findById(farmacoId);
        
        res.json({ farmaco });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error buscando el farmaco', error });
    }
};

//Actualizar farmaco
const updateFarmaco = async (req, res) => {
    try {
        const farmacoId = req.params.id;
        const { name, description, dose, frequency, times, startdate, enddate } = req.body;

        console.log('Datos recibidos para actualización:', req.body);

        // Campos para actualizar
        const updateFarmaco = {};
        if (name) updateFarmaco.name = name;
        if (description) updateFarmaco.description = description;
        if (dose) updateFarmaco.dose = dose;
        if (frequency) updateFarmaco.frequency = frequency;
        if (times) updateFarmaco.times = times;
        if (startdate) updateFarmaco.startdate = startdate;
        if (enddate) updateFarmaco.enddate = enddate;

        // Verifica si hay algún dato para actualizar
        if (Object.keys(updateFarmaco).length === 0) {
            return res.status(400).json({ message: 'No hay campos válidos para actualizar' });
        }

        // Busca y actualiza el fármaco
        const updatedFarmaco = await Farmaco.findByIdAndUpdate(farmacoId, updateFarmaco, { new: true, runValidators: true });

        if (!updatedFarmaco) {
            return res.status(404).json({ message: 'Fármaco no encontrado' });
        }

        res.json({ message: 'Fármaco actualizado exitosamente', updatedFarmaco });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error actualizando el fármaco', error });
    }
};

//Elimina farmaco
const remove = async (req, res) => {
  try {
    console.log('Eliminando fármaco con ID:', req.params.id); // Verifica que el ID sea el correcto
    const farmaco = await Farmaco.findByIdAndDelete(req.params.id);
    if (!farmaco) {
      return res.status(404).json({ message: 'Fármaco no encontrado' });
    }
    res.json({ message: 'Fármaco eliminado exitosamente', farmaco });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando el fármaco', error });
  }
};

module.exports = { create, findAll, findById, updateFarmaco, remove };