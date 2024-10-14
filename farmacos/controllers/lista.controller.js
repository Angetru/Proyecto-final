const Lista = require("../models/lista");

//Crear lista
const create = async (req, res) => {
    try {
const { user, farmacos, categoria} = req.body;

//Nueva lista con array de farmacos
const lista = new Lista({user, farmacos, categoria});
const result = await lista.save();
    res.json({ message: 'Lista creada exitosamente', result });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al crear la lista', error});
    }
};

//Actualizar lista
const update = async (req, res) => {
    try{
        const { user, farmacos, categoria} = req.body;
        //Busca y actualiza lista
        const result = await Lista.findByIdAndUpdate(req.params.id, {user, farmacos: farmacos, categoria: categoria}, {new: true});
        
        if (!result) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }
        res.json({message: 'Lista actualizada', result});

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error actualizando la lista', error});
    }
};

//Eliminar lista
const remove = async (req, res) => {
    try{
        const result = await Lista.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Lista no encontrada' });
        }
        res.json({
            message: 'Lista eliminada exitosamente', result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminando la lista', error });
    }
};

//buscar las listas
const findAll = async (req, res) => {
    try{
        const result = await Lista.find({});
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error obteniendo las listas', error});
    }
};

//buscar por id de Lista
const findById = async (req, res) => {
    try{
        const resultId = req.params.id;
        const result = await Lista.findById(resultId);
        if(!result){
            return res.status(404).json({message: 'Lista no encontrada'});
        }
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error buscando la lista', error });
    }
};

module.exports = { create, findAll, findById, update, remove };