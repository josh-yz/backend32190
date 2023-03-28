const { getProductDTO } = require('../dataAccess/DTOs/product/productDTO');
const DAOFactory = require('../dataAccess/DAOs/product/DAOFactory')


class ProductRepository {
    constructor (){
        this.DAO = DAOFactory.getDao();
    }

    async findAll() {
        const products = await this.DAO.findAll()
        return getProductDTO(products);
    }

    async findByPk(id) {
        try {
            const product = await this.DAO.findById(id)
            return getProductDTO(product)
        } catch (error) {
            return null;
        }
    }

    async create(product) {
        const newProduct = await this.DAO.create(product);
        return getProductDTO(newProduct);
    } 

    async update(id, product) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const upProduct = await this.DAO.update(id, product);
            return getProductDTO(upProduct)
        }
        return null
    }

    
    async delete(id) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const delProduct = await this.DAO.delete(id);
            return getProductDTO(delProduct)
        }
        return null
    }
}

module.exports = ProductRepository
