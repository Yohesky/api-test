const { Schema, model } = require("mongoose");

const EmployeeSchema = Schema({
    nombre: {
        type: String,
    },
    nacimiento: {
        type: String
    },
    pais: {
        type: String
    },
    contratacion: {
        type: Object
    },
    estado: {
        type: Boolean
    },
    area: {
        type: String
    },
    cargo: {
        type: String
    },
    comision: {
        type: String
    },
    edad: {
        type: String
    },
    nombreUsuario: {
        type: String
    }
})

module.exports = model("Employee", EmployeeSchema)