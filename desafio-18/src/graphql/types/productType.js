const productType = `
type Product{
    id: ID!,
    nombre: String!,
    descripcion: String!,
    codigo: Float!,
    foto: String!,
    precio: Float!,
    stock: Float!,
    cantidad: Float!
}`

module.exports = { productType }