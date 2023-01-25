const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    // id: { type: String, required: true },
    author: {
       // id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        email : { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
        timestamp : { type: String, required: true },
    },
    text: { type: String, required: true }
}, { timestamps: false });

MessageSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
MessageSchema.set('versionKey', false);
MessageSchema.set('toJSON', { virtuals: true });

module.exports = model('message', MessageSchema)




