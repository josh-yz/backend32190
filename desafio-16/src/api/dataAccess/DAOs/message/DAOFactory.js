const messageDAOMemo = require('./messageDAOMemo');
const messageDAOMongodb = require('./messageDAOMongodb');

const opcion = process.env.DAO;
let dao;

switch (opcion) {
    case 'memo':
        dao = messageDAOMemo.getInstance()
        break;
    default:
        dao = messageDAOMongodb.getInstance()
        break;
}

class DAOFactory {
    static getDao() {
        return dao
    }
}

module.exports = DAOFactory
