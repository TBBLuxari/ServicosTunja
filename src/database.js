const mongoose = require('mongoose');

const uri =("mongodb+srv://TBBLuxari:DMc53jwH5CIQAryP@prueba-puntos.veb9sop.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(uri ,{})
  .then(db => console.log('Se conecto a la base de datos'))
  .catch(err => console.log(err));