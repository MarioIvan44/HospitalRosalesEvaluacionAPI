/**
 * Campos
    name
    lastName
    email
    password
    phone
    address
    phoneEmergencyContacts [{ phone, nameEmergencyContact }]
    profilePhoto
    isVerified
    loginAttempts
    timeOut
 *  */

import pacientesModel from "../models/pacientes.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "../../config.js";

const pacientesController = {};

//SELECT
pacientesController.getAll = async (req, res) => {
  try {
    const pacientes = await pacientesModel.find();
    if (!pacientes) {
      return res
        .status(404)
        .json({ message: "No se encontraron registros en la colección" });
    }
    return res.status(200).json(pacientes);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//SELECT BY ID
pacientesController.getById = async (req, res) => {
  try {
    const pacientes = await pacientesModel.findById(req.params.id);
    if (!pacientes) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }
    return res.status(200).json(pacientes);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//PUT
pacientesController.put = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      phone,
      address,
      phoneEmergencyContacts,
      isVerified,
      loginAttempts,
      timeOut,
    } = req.body;

    const pacienteEncontado = await pacientesModel.findById(req.params.id);

    if (!pacienteEncontado) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }

    const updatedData = {
      name,
      lastName,
      email,
      password,
      phone,
      address,
      phoneEmergencyContacts,
      isVerified,
      loginAttempts,
      timeOut,
      isAvailable,
    };

    if (req.file) {
      await cloudinary.uploader.destroy(pacienteEncontado.public_id);

      updatedData.profilePhoto = req.file.path,
        updatedData.public_id = req.file.filename;
    }

    const updated = await pacientesModel.findByIdAndUpdate(
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
pacientesController.delete = async (req, res) => {
  try {
    const pacienteEncontado = await pacientesModel.findById(req.params.id);

    await cloudinary.uploader.destroy(pacienteEncontado.public_id);

    const deleted = await pacientesModel.findByIdAndDelete(req.params.id)
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

export default pacientesController;
