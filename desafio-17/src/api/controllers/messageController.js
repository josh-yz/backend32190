const messageRepository = require('../repository/messageRepository');

class MessageController {
    constructor (){
        this.messageService = new messageRepository()
    }

    async getMessage(req, res) {
        let messages = await  this.messageService.findAll();
        if (messages.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: messages
            });
        }
    }

    async getMessageId(req, res) {
        const { id } = req.params;
        let productos = await this.messageService.findByPk(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: productos
            });
        }
    }

    async postMessage(req, res) {
        const { nombre, apellido, email, edad, alias, avatar } = req.body;
        let newMessage = await this.messageService.create({ nombre, apellido, email, edad, alias, avatar })
        if (!newMessage) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: newMessage
            });
        }
    }

    async putMessage(req, res) {
        const { id } = req.params;
        const { nombre, apellido, email, edad, alias, avatar } = req.body;
        let upMessage = await this.messageService.update(id, { nombre, apellido, email, edad, alias, avatar })
        if (!upMessage) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: upMessage
            });
        }
    }
    
    async deleteMessage(req, res) {
        const { id } = req.params;
        let message = await this.messageService.delete(id)
        if (!message) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: message,
                msg: 'Registro eliminado'
            });
        }
    }
}


module.exports = MessageController
 
    
  
