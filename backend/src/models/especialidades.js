/**
 * Campos: 
    specialtyName
    description
    isAvailable
 *  */

import mongoose, {schema, model} from "mongoose"

const especialidadesSchema = new Schema({
    specialtyName: { 
        type: String
    },
    description: {
        type: String
    },
    isAvailable: {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("especialidades", especialidadesSchema)