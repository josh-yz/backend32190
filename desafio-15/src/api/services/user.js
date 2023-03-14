const { userModel } = require('../models/index');


module.exports = {
    async findAll() {
        const messages = await userModel.find();
        return messages;
    },
    async findByPk(id) {
        try {
            const message = await userModel.findById(id);
            return message
        } catch (error) {
            return null;
        }
    },
    async create(user) {
        const newUser = new userModel(user);
        await newUser.save();
        return newUser
    },
    async update(id, user) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const upUser = await userModel.findByIdAndUpdate(id, user, { new: true });
            return upUser
        }
        return null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const delUser = await userModel.findByIdAndDelete(id, { new: true });
            return delUser
        }
        return null
    },
};
