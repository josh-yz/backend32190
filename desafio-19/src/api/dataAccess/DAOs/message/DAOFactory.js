import messageDAOMemo from './messageDAOMemo.js';
import messageDAOMongodb from './messageDAOMongodb.js';

const opcion = process.env.DAO;
let dao;

switch (opcion) {
  case 'memo':
    dao = messageDAOMemo.getInstance();
    break;
  default:
    dao = messageDAOMongodb.getInstance();
    break;
}

class DAOFactory {
  static getDao() {
    return dao;
  }
}

export default DAOFactory;