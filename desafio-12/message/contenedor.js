const fs = require("fs")
const { promisify } = require('util')


//Convertir callbacks a promesas con Promisify
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

class ContainerMessege {

    constructor(fileName = './message/message.txt') {
        this.fileName = `./${fileName}`
        console.log(this.fileName);
    }

    existsFile() { // Saber si el Archivo existe
        return fs.existsSync(this.fileName); // return boolean
    }

    maxId(arr) { // busca en el array el numero mas alto
        const max = Math.max(...arr.map(o => o.id), 0);
        return max;
    }

    async save(message) {
        try {
            if (!this.existsFile()) {
                //Si no existe el archivo crea un registro con la id 1
                await writeFileAsync(this.fileName, JSON.stringify([{ ...message, id: 1 }]));
                return 1;
            } else {
                const arr = await this.getAll();
                const id = this.maxId(arr) + 1;
                const msg = { ...message, id }
                arr.push(msg);
                await writeFileAsync(this.fileName, JSON.stringify(arr));
                return msg;
            }
        } catch (error) {
            throw Error('Error al guardar mensaje 😐', error);
        }
    }

    async update(product) {
        try {
            const arr = await this.getAll();
            const index = arr.findIndex(x => x.id == product.id);
            if (index < 0) {
                return undefined  // el producto no existe
            }
            arr[index] = { ...product }
            await writeFileAsync(this.fileName, JSON.stringify(arr));
            return product
        } catch (error) {
            throw Error('Error al buscar producto 😫');
        }
    }


    async getById(id) {
        try {
            const arr = await this.getAll();
            const product = arr.find(x => x.id == id);
            return product
        } catch (error) {
            throw Error('Error al buscar producto 😫');
        }
    }

    async getAll() {
        try {
            let data = await readFileAsync(this.fileName);

            let arr = JSON.parse(data);

            return arr;



        } catch (error) {
            // si el archivo existe, pero esta vacio el archivo se returna un array vacio
            console.log(error);
            return [];
        }
    }

    async deleteById(id) {
        try {
            const arr = await this.getAll();
            const index = arr.findIndex(x => x.id == id); // obtener el index con la id
            if (index < 0) {
                return undefined
            }
            const name = arr[index].title;
            arr.splice(index, 1); // borrar el registro del array con el index
            await writeFileAsync(this.fileName, JSON.stringify(arr));
            return name
        } catch (error) {
            throw Error('Error al buscar producto 😫');
        }



    }

    async deleteAll() {
        //Aqui limpio el cantenido del txt
        await writeFileAsync(this.fileName, '');
        // Tambien se puede barrar el archivo (Opcional) con = fs.unlinkSync(this.fileName);
        console.log('SE BORRÓ TODOS LOS PRODUCTO!! 🤔🤔🤔');
    }

}

module.exports = { ContainerMessege }