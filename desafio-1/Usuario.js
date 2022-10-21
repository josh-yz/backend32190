class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas
    }

    getFullName()   { 
       return `${this.nombre} ${this.apellido}`; 
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre,autor){
        this.libros.push({nombre,autor});
    }

    getBookNames (){
        return this.libros.map(x=> x.nombre);

    }



}




///////USUARIO 1 /////////////////////
let usuario1 = new Usuario('Joshua','Barraza',[],['Suki']);
/// Agregar dos mascotas
usuario1.addMascota('Osma')
usuario1.addMascota('Esmeralda')

//Agregar dos libros
usuario1.addBook('Introducción a los algoritmos',' Thomas H. Cormen');
usuario1.addBook('Código limpio','Robert C. Martin');

console.log(`
Usuario 1
Nombre : ${usuario1.getFullName()}
Cantidad de Mascotas : ${usuario1.countMascotas()}
Libros : ${usuario1.getBookNames()}
`);



///////USUARIO 2 /////////////////////
let usuario2 = new Usuario('Valerie','Barraza',[],['Flor']);
/// Agregar mascota
usuario2.addMascota('Kalessi')

//Agregar libros
usuario2.addBook('El Gato Que Amaba Los Libros',' Grijalbo');

console.log(`
Usuario 2
Nombre : ${usuario2.getFullName()}
Cantidad de Mascotas : ${usuario2.countMascotas()}
Libros : ${usuario2.getBookNames()}
`);



