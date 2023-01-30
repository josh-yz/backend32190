const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    email: String,
    password: String
}, { timestamps: false });

userSchema.methods.encryptPassword = (password) => {
   return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password,this.password);
}
 
module.exports = model('user', userSchema)