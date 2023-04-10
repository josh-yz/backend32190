import { messageModel } from '../models/message';
import { normalize, denormalize, schema } from 'normalizr';
const porcentaje = (num1, num2) => {
    return Math.trunc(100 - ((num2 * 100) / num1));
};

export default {
    async findAll() {
        const messages = await messageModel.find();
        if (messages.length > 0) {
            let newArray = messages.map(x => {
                return {
                    author: x.author,
                    text: x.text,
                    id: x._id.toHexString()
                }
            });

            const mensajes = {
                id: '100',
                messages: newArray
            }

            const authorSchema = new schema.Entity("author", {},
                { idAttribute: 'email' }
            );
            const messageSchema = new schema.Entity("message",
                { author: authorSchema, }
            );
            const messagesSchema = new schema.Entity("messages",
                { messages: [messageSchema], }
            );
            const normalizedMessage = normalize(mensajes, messagesSchema);

            const originalLength = JSON.stringify(newArray).length;
            const NormalizadoLength = JSON.stringify(normalizedMessage).length;
            let compression = porcentaje(originalLength, NormalizadoLength);

            return { normalizedMessage, compression };
        }

        return { normalizedMessage: [], compression: 0 };
    },
    async findByPk(id) {
        try {
            const message = await messageModel.findById(id);
            return message
        } catch (error) {
            return null;
        }
    },
    async create(message) {
        const newMessage = new messageModel(message);
        await newMessage.save();
        return newMessage
    },
    async update(id, message) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const upMessage = await messageModel.findByIdAndUpdate(id, message, { new: true });
            return upMessage
        }
        return null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const delMessage = await messageModel.findByIdAndDelete(id, { new: true });
            return delMessage
        }
        return null
    },
};
