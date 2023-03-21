const { productModel } = require('../models/index');


module.exports = {
    async findAll() {
        const messages = await productModel.find();
        return messages;
    },
    async findByPk(id) {
        try {
            const message = await productModel.findById(id);
            return message
        } catch (error) {
            return null;
        }
    },
    async create(product) {
        const newProduct = new productModel(product);
        await newProduct.save();
        return newProduct
    },
    async update(id, product) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const upProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
            return upProduct
        }
        return null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const delProduct = await productModel.findByIdAndDelete(id, { new: true });
            return delProduct
        }
        return null
    },
};
