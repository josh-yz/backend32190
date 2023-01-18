const knex = require("knex");



class ContainerMysql {
    constructor(opcions) {
        this.knex = knex(opcions)
    }
     async findAll() {
         const productos = await this.knex('producto').select('*');
         let res = JSON.parse(JSON.stringify(productos));
         return res;
     }

     async create(producto) {
        await this.knex('producto').insert(producto);
     }

     close(){
        this.knex.destroy();
    }

}

module.exports = {ContainerMysql}