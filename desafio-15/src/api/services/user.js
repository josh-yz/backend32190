const { userModel } = require('../models/index');


module.exports = {
    async findAll() {
        const users = await userModel.find();
        return users;
    },
    async findEmail(email) {
        const user = await userModel.findOne({email});
        return user;
    },
    async findByPk(id) {
        try {
            const user = await userModel.findById(id);
            return user
        } catch (error) {
            return null;
        }
    },
    async create(user) {
        const newUser = new userModel(user);
        newUser.password = newUser.encryptPassword(user.password)
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
