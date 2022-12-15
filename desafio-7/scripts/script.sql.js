const knex = require("knex");
const optionsMysql  = require("../config/db.mysql");
const optionsSqlite  = require("../config/db.sqlite");


// const dbMySQL= knex(optionsMysql);
// const dbSQLITE= knex(optionsMysql);



class ClienteMysql{
    constructor(opcions){
        this.knex = knex(opcions)
    }

    async createTable(){
        let productosTable = await this.knex.schema.hasTable("productos");
        console.log(productosTable);

    }

}

(async () => { // function anonymous

    console.log('jola');

const f = new ClienteMysql(optionsMysql);
await f.createTable();


})(); // se autollama