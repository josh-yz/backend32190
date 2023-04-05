const { buildSchema } = require('graphql')
const { productType } = require('../graphql/types/productType')
const { productInput } = require('../graphql/inputs/productInput')

const { productsQueries } = require('../graphql/querys/productQueries')
const { productsMutation } = require('../graphql/mutations/productMutation')

const schema = buildSchema(`
${productType}
${productInput}
type Query {
    ${productsQueries}
}
type Mutation {
    ${productsMutation}
}
`)

module.exports = schema