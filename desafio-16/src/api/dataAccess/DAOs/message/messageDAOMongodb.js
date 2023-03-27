const { messageModel } = require('../../../models');

let instance = null;

class MessageDAO {

    constructor() {
        this.message = messageModel
    }

    static getInstance() {
        if (!instance) {
            instance = new MessageDAO();
            console.log('Se ha Creado una nueva instancia de ProMessageDAOductDAO');
        }
        console.log('Se ha utilizado una instancia ya creada de  MessageDAO');
        return instance;
    }

    async findAll() {
        const message = await this.message.find();
        return message;
    }

    async findByPk(id) {
        try {
            const message = await this.message.findById(id);
            return message
        } catch (error) {
            return null;
        }
    }

    async create(message) {
        const newMessage = new messageModel(message);
        await newMessage.save();
        return newMessage
    }

    async update(id, product) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const upMessage = await this.message.findByIdAndUpdate(id, product, { new: true });
            return upMessage;
        }
        return null
    }

    async delete(id) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const delMessage = await this.message.findByIdAndDelete(id, { new: true });
            return delMessage;
        }
        return null
    }

}

module.exports = MessageDAO;