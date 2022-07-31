const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Esquema = mongoose.Schema;

const usuarioEsquema = new Esquema(
{
    //email Requrida , tipo string , unico(no se puede repetir en la base) ,que se guarde en minusculas
    email:{required: true ,type: String ,unique: true ,lowercase: true},
    password:{required: true ,type: String},
    activo:{required: true ,type: Number}
},
{
    timestamps:true
});

usuarioEsquema.methods.encryptPassword =(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};

usuarioEsquema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model("UsuariosTunja",usuarioEsquema);