const { getMessageDTO } = require('../dataAccess/DTOs/message/mesaggeDTO');
const DAOFactory = require('../dataAccess/DAOs/message/DAOFactory')


class MessageRepository {
    constructor (){
        this.DAO = DAOFactory.getDao();
    }

    async findAll() {
        const messages = await this.DAO.findAll()
        return getMessageDTO(messages);
    }

    async findByPk(id) {
        try {
            const message = await this.DAO.findById(id)
            return getMessageDTO(message)
        } catch (error) {
            return null;
        }
    }

    async create(message) {
        const newMesage = await this.DAO.create(message);
        return getMessageDTO(newMesage);
    } 

    async update(id, message) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const upMessage = await this.DAO.update(id, message);
            return getMessageDTO(upMessage)
        }
        return null
    }

    
    async delete(id) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const delMessage = await this.DAO.delete(id);
            return getMessageDTO(delMessage)
        }
        return null
    }
}

module.exports = MessageRepository
