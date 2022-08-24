const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Esquema = mongoose.Schema;

const notificacionEsquema = new Esquema(
{   
    correo:{required: true ,type: String ,unique: true },
    titulo:{required: true ,type: String,unique: false},
    mensaje:{required: true ,type: String,unique: false},
    link:{required: true ,type: String,unique: false},
    NA1:{type:{TNA1:String , unique: false ,MNA1:String, unique: false ,LNA1:String ,unique: false}},
    NA2:{type:{TNA2:String , unique: false ,MNA2:String, unique: false ,LNA2:String ,unique: false}},
    NA3:{type:{TNA3:String , unique: false ,MNA3:String, unique: false ,LNA3:String ,unique: false}},
    NA4:{type:{TNA4:String , unique: false ,MNA4:String, unique: false ,LNA4:String ,unique: false}},
   
},
{
    timestamps:{createdAt:false, updatedAt:"UltimaNotificaion" },
    versionKey:false,   
});



module.exports = mongoose.model("notificacionestunja",notificacionEsquema);