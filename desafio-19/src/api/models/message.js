import { Schema, model } from 'mongoose';

const MessageSchema = Schema(
  {
    author: {
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      email: { type: String, required: true },
      edad: { type: Number, required: true },
      alias: { type: String, required: true },
      avatar: { type: String, required: true },
      timestamp: { type: String, required: true },
    },
    text: { type: String, required: true },
  },
  { timestamps: false }
);

MessageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
MessageSchema.set('versionKey', false);
MessageSchema.set('toJSON', { virtuals: true });

export default model('message', MessageSchema);



