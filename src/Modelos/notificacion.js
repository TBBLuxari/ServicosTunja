const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Esquema = mongoose.Schema;

const notificacionEsquema = new Esquema(
{   
    titulo:{required: true ,type: String ,unique: true ,lowercase: true},
    mensaje:{required: true ,type: String},
    payload:{required: true ,type: String},
},
{
    timestamps:{createdAt:false, updatedAt:"UltimaNotificaion" },
    versionKey:false,   
});



module.exports = mongoose.model("notificacionestunja",notificacionEsquema);