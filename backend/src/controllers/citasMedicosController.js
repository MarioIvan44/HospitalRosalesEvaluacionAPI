/**
 * Campos: 
    patient_id
    specialty_id
    appointmentDate
    reason
    status
    observations
 *  */

const citasMedicasController = {};

import citasMedicasModel from "../models/citasMedicas.js";

//SELECT
citasMedicasController.getAll = async (req, res) => {
  try {
    const citasMedicas = await citasMedicasModel
      .find()
      .populate("patient_id", "")
      .populate("specialty_id", "");
    if (!citasMedicas) {
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
citasMedicasController.getById = async (req, res) => {
  try {
    const citaMedica = await citasMedicasModel.findById(req.params.id);
    if (!citaMedica) {
      return res.status(404).json({ message: "No se encontró el registro" });
    }
    return res.status(200).json(citaMedica);
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//INSERT
citasMedicasController.create = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;

    const newCitaMedica = new citasMedicasModel({
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    });
    await newCitaMedica.save();

    return res.status(200).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("error: " + error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//PUT
citasMedicasController.put = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;
    const updated = await citasMedicasModel.findByIdAndUpdate(
      req.params.id,
      {
        patient_id,
        specialty_id,
        appointmentDate,
        reason,
        status,
        observations,
      },
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
citasMedicasController.delete = async (req, res) => {
  try {
    const deleted = await citasMedicasModel.findByIdAndDelete(req.params.id);
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

export default citasMedicasController;
