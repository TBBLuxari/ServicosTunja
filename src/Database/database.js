const mongoose = require('mongoose');

const uri =("mongodb+srv://TBBLuxari:DMc53jwH5CIQAryP@prueba-puntos.veb9sop.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(uri ,{dbName:"Sesiones"})
.then(db => console.log('Se conecto a la base de datos la coleccion Usuarios'))
.catch(err => console.log(err));