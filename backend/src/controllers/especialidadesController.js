/**
 * Campos: 
    specialtyName
    description
    isAvailable
 *  */

const especialidadesController = {};

import especialidadesModel from "../models/especialidades.js";

//SELECT
especialidadesController.getAll = async (req, res) => {
  try {
    const especialidades = await especialidadesModel.find();
    if (!especialidades) {
      return res
        .status(404)
        .json({ message: "No se encontraron registros en la colección" });
    }
    return res.status(200).json(especialidades);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//INSERT
especialidadesController.create = async (req, res) => {
  try {
    const { specialtyName, description, isAvailable } = req.body;

    const newEspecialidad = new especialidadesModel({
      specialtyName,
      description,
      isAvailable,
    });
    await newEspecialidad.save();

    return res.status(200).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//PUT
especialidadesController.put = async (req, res) => {
  try {
    const { specialtyName, description, isAvailable } = req.body;
    const updated = await especialidadesModel.findByIdAndUpdate(
      req.params.id,
      { specialtyName, description, isAvailable },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }

    return res
      .status(200)
      .json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//DELETE
especialidadesController.delete = async (req, res) => {
  try {
    const deleted = await especialidadesModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }

    return res
      .status(200)
      .json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export default especialidadesController;
