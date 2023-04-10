import MessageRepository from '../repository/messageRepository.js';

class MessageController {
    constructor() {
        this.messageService = new MessageRepository();
    }

    getMessage = async (req, res) => {
        const messages = await this.messageService.findAll();
        if (messages.length === 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: messages
            });
        }
    }

    getMessageId = async (req, res) => {
        const { id } = req.params;
        const message = await this.messageService.findByPk(id);
        if (!message) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: message
            });
        }
    }

    postMessage = async (req, res) => {
        const { nombre, apellido, email, edad, alias, avatar } = req.body;
        const newMessage = await this.messageService.create({ nombre, apellido, email, edad, alias, avatar });
        if (!newMessage) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: newMessage
            });
        }
    }

    putMessage = async (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, email, edad, alias, avatar } = req.body;
        const updatedMessage = await this.messageService.update(id, { nombre, apellido, email, edad, alias, avatar });
        if (!updatedMessage) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: updatedMessage
            });
        }
    }

    deleteMessage = async (req, res) => {
        const { id } = req.params;
        const message = await this.messageService.delete(id);
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

export default MessageController;
  
