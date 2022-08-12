const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Esquema = mongoose.Schema;

const notificacionEsquema = new Esquema(
{   
    correo:{required: true ,type: String ,unique: true },
    titulo:{required: true ,type: String},
    mensaje:{required: true ,type: String},
    link:{required: true ,type: String},
    NA1:{type:{TNA1:String ,MNA1:String,LNA1:String}},
    NA2:{type:{TNA2:String ,MNA2:String,LNA2:String}},
    NA3:{type:{TNA3:String ,MNA3:String,LNA3:String}},
    NA4:{type:{TNA4:String ,MNA4:String,LNA4:String}},
   
},
{
    timestamps:{createdAt:false, updatedAt:"UltimaNotificaion" },
    versionKey:false,   
});



module.exports = mongoose.model("notificacionestunja",notificacionEsquema);