const { messageService } = require('../services');


module.exports = {
    async getMessage(req, res) {
        let messeges = await messageService.findAll();
        if (messeges.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: messeges
            });
        }
    },
    async getMessageId(req, res) {
        const { id } = req.params;
        let productos = await messageService.findByPk(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: productos
            });
        }
    },
    async postMessage(req, res) {
        const { nombre, apellido, email, edad, alias, avatar } = req.body;
        let newMessage = await messageService.create({ nombre, apellido, email, edad, alias, avatar })
        if (!newMessage) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: newMessage
            });
        }
    },
    async putMessage(req, res) {
        const { id } = req.params;
        const { nombre, apellido, email, edad, alias, avatar } = req.body;
        let upMessage = await messageService.update(id, { nombre, apellido, email, edad, alias, avatar })
        if (!upMessage) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: upMessage
            });
        }
    },
    async deleteMessage(req, res) {
        const { id } = req.params;
        let message = await messageService.delete(id)
        if (!message) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: message,
                msg: 'Registro eliminado'
            });
        }
    },
}