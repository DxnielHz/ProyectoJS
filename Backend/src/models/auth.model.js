//Primero es la carpeta modelo para la creacion de los objetos
//Y luego el Schemas para la validacion de los productos
//Schemas a Middlwares
//De middwalers a controles
// Los controles estan todo para el metodo CRUD
//De controles a rutas

import mongoose from "mongoose";

const authSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Auth', authSchema)