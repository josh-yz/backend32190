/**
 * Hola, el desafio quise hacerlo con valores aleatorio:
 * es decir, que buscar,eliminar pueden generar una id aleatorio (1 hasta 10)
 * y el guardar producto producto tiene una funcion que returna un boolean aleatorio,
 * con ese boolean se determina si se puede guardar o no en el .txt tambien hace algo 
 * simular cuando se elimina todo del .txt .
 * 
 * Cada vez que ejecutes el js va a tener resultados diferentes
 * **/

const fs = require("fs")
const { promisify } = require('util') 


//Convertir callbacks a promesas con Promisify
const readFileAsync = promisify(fs.readFile) 
const writeFileAsync = promisify(fs.writeFile)


const arrProduct = [ // lista de productos
    {
        title: 'Notebook Gamer ROG Flow',
        price: 1229990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/45617/3_1000.jpg?t=1662132110074'
    },
    {
        title: 'Mouse Gamer G203 RGB',
        price: 22990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/37487/1_1000.jpg?t=1662090363519'
    },
    {
        title: 'Apple Watch Series 7',
        price: 384990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/43903/1_1000.jpg?t=1661809171342'
    },
    {
        title: 'Control Dualsense PS5 Blanco',
        price: 72990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/39193/1_1000.jpg?t=1659961207099'
    },
    {
        title: 'Audífono In Ear Galaxy Buds2 Pro Violeta',
        price: 194990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/46750/1_1000.jpg?t=1664308272842'
    },
    {
        title: 'Memoria Notebook 8GB SoDimm',
        price: 35990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/35103/1_1000.jpg?t=1662085805155'
    },
    {
        title: 'Refrigerador Side By Side de 638 L',
        price: 679990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/42927/1_1000.jpg?t=1663946336203'
    },
    {
        title: 'Smartphone Galaxy A03 64GB/4GB Negro Wom',
        price: 84990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/46562/1_1000.jpg?t=1666813934661'
    },
    {
        title: 'Audífonos Gamer PS5 Pulse 3D Wireless',
        price: 89990,
        thumbnail: 'https://www.pcfactory.cl/public/foto/39197/1_1000.jpg?t=1659961219152'
    }
];



class Container {

    constructor(fileName) {
        this.fileName = `./${fileName}`
    }

    existsFile() { // Saber si el Archivo existe
        return fs.existsSync(this.fileName); // return boolean
    }

    maxId(arr) { // busca en el array el numero mas alto
        const max = Math.max(...arr.map(o => o.id), 0);
        return max;
    }

    async save(product) {
        try {
            if (!this.existsFile()) {
                //Si no existe el archivo crea un registro con la id 1
                await writeFileAsync(this.fileName, JSON.stringify([{ ...product, id: 1 }]));
                return 1;
            } else {
                const arr = await this.getAll();
                const id = this.maxId(arr) + 1;
                const producto = { ...product, id }
                arr.push(producto);
                await writeFileAsync(this.fileName, JSON.stringify(arr));
                return producto;
            }
        } catch (error) {
            throw Error('Error al guardar producto 😐');
        }
    }

    async update(product) {
        try {
            const arr = await this.getAll();
            const index = arr.findIndex(x => x.id == product.id);
            if (index<0) {
                return undefined  // el producto no existe
            }
            arr[index] = {...product}
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


const saveRandom = () => {  // boolean randon
    const num = Math.random();
    return (num < 0.5) ? false : true
};


const numRandom = () => Math.floor(Math.random() * 25) + 1; // numeros randon 1 hasta 25


module.exports = {Container}





