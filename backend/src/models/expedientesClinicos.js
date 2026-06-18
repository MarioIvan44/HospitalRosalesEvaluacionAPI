/*
    Campos
    patient_id
    diagnosis
    medications [{ medicineName }]
    medicalNotes

 */


import mongoose, {schema, model} from "mongoose"

const expedientesClinicosSchema = new Schema({
    patient_id: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "pacientes"
    },
    diagnosis: {
        type: String
    },
    medications: [{
        medicineName: {
            type: String
        }
    }],
    medicalNotes: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("expedientesClinicos", expedientesClinicosSchema)