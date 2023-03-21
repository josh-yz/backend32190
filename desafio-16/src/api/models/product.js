const {Schema , model} = require('mongoose');

const ProductShema = Schema({
    nombre : {
        type : String,
        required : true
    },
    descripcion : {
        type : String,
        required : true
    },
    codigo : {
        type : String,
        required : true
    },
    foto : {
        type : String,
        required : true
    },
    precio : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    }, 
},{ timestamps: true });


module.exports = model('Product',ProductShema) 