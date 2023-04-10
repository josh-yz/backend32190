import userService  from '../services/user.js';

export default {
  async getUser(req, res) {
    const users = await userService.findAll();
    if (users.length === 0) {
      res.status(204).json();
    } else {
      res.status(200).json({
        data: users,
      });
    }
  },

  async getUserId(req, res) {
    const { id } = req.params;
    const user = await userService.findByPk(id);
    if (!user) {
      res.status(204).json();
    } else {
      res.status(200).json({
        data: user,
      });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await userService.delete(id);
    if (!deletedUser) {
      res.status(204).json();
    } else {
      res.status(200).json({
        data: deletedUser,
        msg: 'Registro eliminado',
      });
    }
  },
};