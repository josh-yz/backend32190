const { io } = require('../server');
const { Container } = require('../products/contenedor');
const { ContainerMessege } = require('../message/contenedor');
const products = new Container()
const messeges = new ContainerMessege()


let productAll = async () => {
    const arr = await products.getAll();
    //(io) seria todo el servidor socket (va a emitir un mensaje a todos los cliente conectodos)
    // (client) solo emite al cliente que hizo el llammado 
    //(cliente.broadcast) // emite a todos menos ek que lo emitio
    io.sockets.emit('products-list', { productos: arr });
}

let messegeAll = async () => {
    const arr = await messeges.getAll();
    io.sockets.emit('messeges-list', { messeges: arr });
}

// Mensajes de Sockets
io.on('connection', async client => {

    ///cada ver que se conecta genera un id unico para el usuario
    client.on('product-new', async (payload) => {
        await products.save(payload);
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
        await messeges.save(payload);
        await messegeAll();
    });

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

});
