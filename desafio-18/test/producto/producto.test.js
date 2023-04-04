const request = require('supertest')('http://localhost:8080/api/producto')
const expect = require('chai').expect


const productoTest = {
    nombre: "Mouse Gamer G203 RGB2",
    descripcion: "Mouse Gam",
    codigo: "1233403j",
    foto: "https://www.pcfactory.cl/public/foto/37487/1_1000.jpg?t=1662090363519",
    precio: 22990,
    stock: 4
}

let idProducto = '';

describe('Test API RESTfull productos', () => {
    describe('GET/', () => {
        it('Debería retornar status 200', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })

        it('Debería retornar un array producto', async () => {
            const response = await request.get('/')
            expect(typeof response.body).to.eql('object')
        })
    })

    describe('GET/id', () => {
        it('Debería retornar un 200 producto con el ID especificado', async () => {
            const id = '6410012ca36708d3f2ec2718'
            const response = await request.get(`/${id}`)
            expect(response.status).to.eql(200);
            expect(typeof response.body).to.eql('object')
        });
    });

    describe('POST/', () => {
        it('Debería Crear un nuevo producto', async () => {
            const response = await request.post(`/`).send(productoTest)
            expect(response.status).to.eql(201);
            idProducto = response.status == 201 ? response.body.data.id : '';
            expect(typeof response.body).to.eql('object')
        });
    });

    describe('PUT/', () => {
        it('Debería actualizar un producto', async () => {
            const response = await request.put(`/${idProducto}`).send({...productoTest,nombre : 'prueba test' })
            expect(response.status).to.eql(200);
            expect(typeof response.body).to.eql('object')
        });
    });

    describe('DELETE/', () => {
        it('Debería eliminar un producto', async () => {
            const response = await request.delete(`/${idProducto}`)
            expect(response.status).to.eql(200);
            expect(typeof response.body).to.eql('object')
        });
    });


})
