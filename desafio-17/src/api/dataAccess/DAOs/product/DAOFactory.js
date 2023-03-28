const productDAOMemo = require('./productDAOMemo');
const productDAOMongodb = require('./productDAOMongodb');

const opcion = process.env.DAO;
console.log(opcion);
let dao;

switch (opcion) {
    case 'memo':
        dao = productDAOMemo.getInstance()
        break;
    default:
        dao = productDAOMongodb.getInstance()
        break;
}

class DAOFactory {
    static getDao() {
        return dao
    }
}

module.exports = DAOFactory
