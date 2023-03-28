const knex = require("knex");
const optionsMysql = require("../../../config/db.mysql");
const optionsSqlite = require("../../../config/db.sqlite");



class ClienteMysql {
    constructor(opcions) {
        this.knex = knex(opcions)
    }

    async createTable() {
        // hasTable pregunto si existe la tabla
        let isTable = await this.knex.schema.hasTable("producto");
        if (isTable) { // si existe la borro
            await this.knex.schema.dropTable("producto");
        }
        await this.knex.schema.createTable("producto", table => {
            table.increments("id");
            table.string("title", 60).nullable(false);
            table.integer("price").nullable(false);
            table.string("thumbnail", 250).nullable(false);
        });

        this.knex.destroy();
    }

}

class ClienteSQLITE {
    constructor(opcions) {
        this.knex = knex(opcions)
    }

    async createTable() {
        // hasTable pregunto si existe la tabla
        let isTable = await this.knex.schema.hasTable("chat");
        if (isTable) { // si existe la borro
            await this.knex.schema.dropTable("chat");
        }
        await this.knex.schema.createTable("chat", table => {
            table.increments("id");
            table.string("email",30);
            table.string("timestamp", 40);
            table.string("text",250);
        });

        this.knex.destroy();
    }

}

(async () => { // function anonymous

    //se crea la tabla producto (database : coderhouse.sql)
    const producto = new ClienteMysql(optionsMysql);
    await producto.createTable();


    //se crea la tabla chat (database : coderhouse.sqlite)
    const chat = new ClienteSQLITE(optionsSqlite);
    await chat.createTable();

    console.log('Todo OK 👍');
})(); // se autollama