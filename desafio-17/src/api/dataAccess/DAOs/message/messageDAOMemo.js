let instance = null;
class MessageDAOMemo {

    constructor() {
        this.message = [
            {
                author: {
                    nombre: 'joshua',
                    apellido: 'Barraza',
                    email: 'josh_@hotmail.com',
                    edad: '16',
                    alias: 'josh',
                    avatar: 'wwww',
                    id: 2343
                },
                text: 'prueba'
            },
            {
                author: {
                    nombre: 'joshua',
                    apellido: 'Barraza',
                    email: 'josh_@hotmail.com',
                    edad: '16',
                    alias: 'josh',
                    avatar: 'wwww',
                    id: 234334
                },
                text: 'prueba'
            }

        ]
    }

    static getInstance() {
        if (!instance) {
            instance = new MessageDAOMemo();
            console.log('Se ha Creado una nueva instancia de MessageDAOMemo');
        }
        console.log('Se ha utilizado una instancia ya creada de  MessageDAOMemo');
        return instance;
    }

    async findAll() {
        const message = this.message;
        return message;
    }

    async findByPk(id) {
        try {
            const message = this.message.find(x => x.author.id == id);
            return message
        } catch (error) {
            return null;
        }
    }

    async create(message) {
        this.message.push(message);
        return message
    }

    async update(id, message) {
        try {
            const arr = this.getAll();
            const index = this.message.findIndex(x => x.id.author == id);
            if (index < 0) {
                return undefined  // el producto no existe
            }
            this.message = arr[index] = { ...message }
            return message
        } catch (error) {
            throw Error('Error al buscar message 😫');
        }
    }

    async delete(id) {
        const index = this.message.findIndex(x => x.id.author == id); // obtener el index con la id
        if (index < 0) {
            return undefined
        }
        this.message.splice(index, 1); // borrar el registro del array con el index
        return true
    }

}


module.exports = MessageDAOMemo;
