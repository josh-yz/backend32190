const { userService } = require('../services');


module.exports = {
    async getUser(req, res) {
        let users = await userService.findAll();
        if (users.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: users
            });
        }
    },
    async getUserId(req, res) {
        const { id } = req.params;
        let user = await userService.findByPk(id);
        if (!user) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: user
            });
        }
    },
    async deleteUser(req, res) {
        const { id } = req.params;
        let producto = await userService.delete(id)
        if (!producto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: producto,
                msg: 'Registro eliminado'
            });
        }
    },
}