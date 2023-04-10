import DTO from '../dataAccess/DTOs/message/mesaggeDTO.js';
import  DAOFactory from '../dataAccess/DAOs/message/DAOFactory.js'



class MessageRepository {
    constructor (){
        this.DAO = DAOFactory.getDao();
    }

    async findAll() {
        const messages = await this.DAO.findAll()
        return DTO.getMessageDTO(messages);
    }

    async findByPk(id) {
        try {
            const message = await this.DAO.findById(id)
            return DTO.getMessageDTO(message)
        } catch (error) {
            return null;
        }
    }

    async create(message) {
        const newMesage = await this.DAO.create(message);
        return DTO.getMessageDTO(newMesage);
    } 

    async update(id, message) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const upMessage = await this.DAO.update(id, message);
            return DTO.getMessageDTO(upMessage)
        }
        return null
    }

    
    async delete(id) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const delMessage = await this.DAO.delete(id);
            return DTO.getMessageDTO(delMessage)
        }
        return null
    }
}

export default MessageRepository;
