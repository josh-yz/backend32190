import DTO  from '../dataAccess/DTOs/product/productDTO.js';
import DAOFactory from '../dataAccess/DAOs/product/DAOFactory.js';

class ProductRepository {
    constructor (){
        this.DAO = DAOFactory.getDao();
    }

    async findAll() {
        const products = await this.DAO.findAll()
        return DTO.getProductDTO(products)
    }

    async findByPk(id) {
        try {
            const product = await this.DAO.findByPk(id)
            return DTO.getProductDTO(product)
        } catch (error) {
            return null;
        }
    }

    async create(product) {
        const newProduct = await this.DAO.create(product);
        return DTO.getProductDTO(newProduct);
    } 

    async update(id, product) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const upProduct = await this.DAO.update(id, product);
            return DTO.getProductDTO(upProduct)
        }
        return null
    }

    
    async delete(id) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const delProduct = await this.DAO.delete(id);
            return DTO.getProductDTO(delProduct)
        }
        return null
    }
}

export default ProductRepository;
