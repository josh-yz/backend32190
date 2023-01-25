const knex = require("knex");
const { faker } = require('@faker-js/faker');
faker.locale = 'en'


class ContainerFaker {
    constructor() {

    }
    async findAll() {
        let emptyArray = Array(5).fill(undefined);
        return emptyArray.map(x => {
            return {
                title: faker.commerce.product(),
                price: Math.floor(Math.random() * 10),
                thumbnail: faker.image.cats()
            }
        });
    }
}

module.exports = { ContainerFaker }