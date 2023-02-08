const knex = require("knex");



class ContainerSqlite {
    constructor(opcions) {
        this.knex = knex(opcions)
    }
     async findAll() {
         const chats = await this.knex('chat').select('*');
         let res = JSON.parse(JSON.stringify(chats));
         return res;
     }

     async create(chat) {
        await this.knex('chat').insert(chat);
     }

     close(){
        this.knex.destroy();
    }

}
module.exports = {ContainerSqlite}