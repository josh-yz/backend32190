// Definimos una clase de error personalizada para los errores de validación
class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
  }

  module.exports = ValidationError;