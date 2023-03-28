const request = require('supertest')('http://localhost:8080/api/producto')
const expect = require('chai').expect



describe('Test API RESTfull productos', () => {
    describe('GET/', () => {
        it('Debería retornar status 200', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })

        it('Debería retornar un array producto', async () => {
            const response = await request.get('/')
            expect(typeof response._body).to.eql('object')
        })
    })


    
})

