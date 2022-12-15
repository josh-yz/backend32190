const { io } = require('../server');

const optionsMysql = require("../config/db.mysql");
const {  ContainerMysql } = require('../products/contenedor.msql');
const products = new ContainerMysql(optionsMysql);

const optionsSqlite = require("../config/db.sqlite");
const { ContainerSqlite } = require('../message/contenedor.sqlite');
const messeges = new ContainerSqlite(optionsSqlite)





let productAll = async () => {
    const arr = await products.findAll();

    //(io) seria todo el servidor socket (va a emitir un mensaje a todos los cliente conectodos)
    // (client) solo emite al cliente que hizo el llammado 
    //(cliente.broadcast) // emite a todos menos ek que lo emitio
    io.sockets.emit('products-list', { productos: arr });
}

let messegeAll = async () => {
    const arr = await messeges.findAll();
    io.sockets.emit('messeges-list', { messeges: arr });
}

// Mensajes de Sockets
io.on('connection', async client => {

    ///cada ver que se conecta genera un id unico para el usuario
    client.on('product-new', async (payload) => {
        await products.create(payload);
        await productAll();
    });
    /// (on) te permite estar escuchando el mensaje
    client.on('products', async () => {
        await productAll();

    });

    client.on('messages', async () => {
        await messegeAll();
    });

    client.on("message-new", async (payload) => {
        await messeges.create(payload);
        await messegeAll();
    });

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

});
