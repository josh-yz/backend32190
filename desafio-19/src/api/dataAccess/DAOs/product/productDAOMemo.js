

let instance = null;
class ProductDAOMemo {

    constructor() {
        this.product = [
            {
            nombre: "Control Dualsense PS5 Blancoprueba ",
			descripcion: "Control Dualsense PS5 Blanco",
			codigo: "12",
			foto: "https://www.pcfactory.cl/public/foto/39193/1_1000.jpg?t=1659961207099",
			precio: 72990,
			stock: 4,
			id: "6410012ca36708d3f2ec2718"
        },
        {
            nombre: "Control  ",
			descripcion: "Co",
			codigo: "12",
			foto: "https://www.pcfactory.cl/public/foto/39193/1_1000.jpg?t=1659961207099",
			precio: 72990,
			stock: 4,
			id: "6410012ca36708d3f2ec2718"
        }
        ]
    }

    static getInstance() {
		if (!instance) {
			instance = new ProductDAOMemo();
			console.log('Se ha Creado una nueva instancia de ProductDAOMemo');
		}
		console.log('Se ha utilizado una instancia ya creada de  ProductDAOMemo');
		return instance;
	}

    async findAll() {
        const product = this.product;
        return product;
    }

    async findByPk(id) {
        try {
            const product = this.product.find(x=> x.id == id);
            return product
        } catch (error) {
            return null;
        }
    }

    async create(product) {
        const newProduct = this.product.push(product);
        return product
    }



    async update(product) {
        try {
            const arr =  this.getAll();
            const index = arr.findIndex(x => x.id == product.id);
            if (index<0) {
                return undefined  // el producto no existe
            }
            this.arr = arr[index] = {...product}
            return product
        } catch (error) {
            throw Error('Error al buscar producto 😫');
        }
    }

    async delete(id) {
        const isExists =  this.findByPk(id);
        if (isExists) {
            this.product.splice(index, 1); 
            return this.product[index]
        }
        return null
    }

}

export default ProductDAOMemo;