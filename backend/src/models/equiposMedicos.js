/**
 * Campos
 * equipmentName
    description
    brand
    model
    purchaseDate
    maintenanceDate
    condition
    image
    status
    isAvailable
 */

import mongoose, {schema, model} from "mongoose"

const equiposMedicosSchema = new Schema({
    equipmentName: {
        type: String
    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    purchaseDate: {
        type: Date
    },
    maintenanceDate: {
        type: Date
    },
    condition: { 
        type: String
    },
    image: { //Imagen cloudinary
        type: String
    },
    public_id: {
        type: String
    },
    status: {
        type: String
    },
    isAvailable: {
        type: Date
    },
}, {
    timestamps: true,
    strict: false
})

export default model ("equiposMedicos", equiposMedicosSchema)