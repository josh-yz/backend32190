
class ProductDTO {
    constructor({ _id,nombre, descripcion, codigo ,foto,precio,stock}) {
        this.nombre=nombre
        this.descripcion=descripcion
        this.codigo=codigo
        this.foto=foto
        this.precio=precio
        this.stock=stock
        this.id = _id

    }
  }

  function getProductDTO(data) {
    if (Array.isArray(data)) {
      return data.map(e => new ProductDTO(e))
    } else {
      return new ProductDTO(data)
    }
  }


  exports.getProductDTO = (data) => getProductDTO(data);
