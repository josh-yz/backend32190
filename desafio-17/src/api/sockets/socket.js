const { io } = require('../../../server');
// const {
//     messageService,
//     productService
// } = require('../services/index')


const messageRepository = require('../repository/messageRepository');
const productRepository = require('../repository/productRepository');


const messageService = new messageRepository();
const productService = new productRepository();



let productAll = async () => {
    const arr = await productService.findAll();
    //(io) seria todo el servidor socket (va a emitir un mensaje a todos los cliente conectodos)
    // (client) solo emite al cliente que hizo el llammado 
    //(cliente.broadcast) // emite a todos menos ek que lo emitio
    io.sockets.emit('products-list', { productos: arr });
}

let messegeAll = async () => {
    const { normalizedMessage, compression } = await messageService.findAll();
    io.sockets.emit('messeges-list', { messeges: normalizedMessage, compression });
}

// Mensajes de Sockets
io.on('connection', async client => {

    ///cada ver que se conecta genera un id unico para el usuario
    client.on('product-new', async (payload) => {
        await productService.create(payload);
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

        await messageService.create(payload);
        await messegeAll();
    });

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

});
