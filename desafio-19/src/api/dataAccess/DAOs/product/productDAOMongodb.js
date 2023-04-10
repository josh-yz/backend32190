import productModel from '../../../models/product.js';


let instance = null;
class ProductDAO {

    constructor() {
        this.product = productModel
    }

    static getInstance() {
		if (!instance) {
			instance = new ProductDAO();
			console.log('Se ha Creado una nueva instancia de ProductDAO');
		}
		console.log('Se ha utilizado una instancia ya creada de  ProductDAO');
		return instance;
	}

    async findAll() {
        const product = await this.product.find();
        return product;
    }

    async findByPk(id) {
        try {
            const product = await this.product.findById(id);
            return product
        } catch (error) {
            return null;
        }
    }

    async create(product) {
        const newProduct = new this.product(product);
        await newProduct.save();
        return newProduct
    }

    async update(id, product) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const upProduct = await this.product.findByIdAndUpdate(id, product, { new: true });
            return upProduct
        }
        return null
    }

    async delete(id) {
        const isExists = await this.findByPk(id);
        if (isExists) {
            const delProduct = await this.product.findByIdAndDelete(id, { new: true });
            return delProduct
        }
        return null
    }

}

export default ProductDAO;