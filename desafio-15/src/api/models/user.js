const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const ValidationError = require('../../core/errors/validationError');

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            // Expresión regular para validar el formato de un correo electrónico
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return emailRegex.test(v);
          },
          message: '|El correo electrónico {VALUE} no es válido'
        }
      },
    password: String
}, { timestamps: false });

userSchema.methods.encryptPassword = (password) => {
   return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.validateEmailNotTaken = async function () {
    const user = await this.constructor.findOne({ email: this.email });
    if (user) {
      throw new ValidationError('El correo electrónico ya está en uso.');
    }
  };
 
module.exports = model('user', userSchema)