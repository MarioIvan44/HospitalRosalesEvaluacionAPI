/**
 * Campos: 
    equipmentName
    description
    brand
    model
    purchaseDate
    maintenanceDate
    condition
    image
    status
    isAvailable
 *  */

import equiposMedicosModel from "../models/equiposMedicos.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "../../config.js";

const equiposMedicosController = {};

//SELECT
equiposMedicosController.getAll = async (req, res) => {
  try {
    const equiposMedicos = await equiposMedicosModel.find();
    if (!equiposMedicos) {
      return res
        .status(404)
        .json({ message: "No se encontraron registros en la colección" });
    }
    return res.status(200).json(equiposMedicos);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//SELECT BY ID
equiposMedicosController.getById = async (req, res) => {
  try {
    const equiposMedico = await equiposMedicosModel.findById(req.params.id);
    if (!equiposMedico) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }
    return res.status(200).json(equiposMedico);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//INSERT
equiposMedicosController.create = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      status,
      isAvailable,
    } = req.body;

    const newEquipoMedico = new equiposMedicosModel({
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      image: req.file.path,
      public_id: req.file.filename,
      status,
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
equiposMedicosController.put = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      status,
      isAvailable,
    } = req.body;

    const equiposMedicoEncontrado = await equiposMedicosModel.findById(
      req.params.id,
    );

    if (!equiposMedicoEncontrado) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }

    const updatedData = {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      condition,
      status,
      isAvailable,
    };

    if(req.file){
        await cloudinary.uploader.destroy(equiposMedicoEncontrado.public_id)

        updatedData.image = req.file.path,
        updatedData.public_id = req.file.filename
    }

    const updated = await equiposMedicosModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
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
equiposMedicosController.delete = async (req, res) => {
  try {
    const deleted = await equiposMedicosModel.findByIdAndDelete(req.params.id);
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

export default equiposMedicosController;
