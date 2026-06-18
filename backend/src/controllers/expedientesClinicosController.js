/**
 * Campos
    patient_id
    diagnosis
    medications [{ medicineName }]
    medicalNotes
 */

const expedientesClinicosController = {};

import expedientesClinicosModel from "../models/expedientesClinicos.js";

//SELECT
expedientesClinicosController.getAll = async (req, res) => {
  try {
    const expedientesClinicos = await expedientesClinicosModel
      .find()
      .populate("patient_id", "");
    if (!expedientesClinicos) {
      return res
        .status(404)
        .json({ message: "No se encontraron registros en la colección" });
    }
    return res.status(200).json(citasMedicas);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//SELECT BY ID
expedientesClinicosController.getById = async (req, res) => {
  try {
    const expedienteClinico = await expedientesClinicosModel.findById(
      req.params.id,
    );
    if (!expedienteClinico) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }
    return res.status(200).json(expedienteClinico);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//INSERT
expedientesClinicosController.create = async (req, res) => {
  try {
    const { patient_id, diagnosis, medications, medicalNotes } = req.body;

    const newExpedienteClinico = new expedientesClinicosModel(
      { patient_id, diagnosis, medications, medicalNotes }
    );
    
    await newExpedienteClinico.save();

    return res.status(200).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//PUT
expedientesClinicosController.put = async (req, res) => {
  try {
    const { patient_id, diagnosis, medications, medicalNotes } = req.body;
    const updated = await citasMedicasModel.findByIdAndUpdate(
      req.params.id,
      { patient_id, diagnosis, medications, medicalNotes },
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
expedientesClinicosController.delete = async (req, res) => {
  try {
    const deleted = await expedientesClinicosModel.findByIdAndDelete(req.params.id);
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

export default expedientesClinicosController;
