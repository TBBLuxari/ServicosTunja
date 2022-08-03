const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Esquema = mongoose.Schema;

const notificacionEsquema = new Esquema(
{   
    correo:{required: true ,type: String ,unique: true },
    titulo:{required: true ,type: String},
    mensaje:{required: true ,type: String},
    link:{required: true ,type: String},
   
},
{
    timestamps:{createdAt:false, updatedAt:"UltimaNotificaion" },
    versionKey:false,   
});



module.exports = mongoose.model("notificacionestunja",notificacionEsquema);