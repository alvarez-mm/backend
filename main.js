class Usuario {
	constructor (nombre, apellido, libros, mascotas) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}
           
    getFullName () {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota) {
        return this.mascotas.push(nuevaMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(titulo, autor) {
   		return this.libros.push({titulo, autor});
    }

	getBookNames() {
		const newArray = this.libros.filter(item => item.titulo);
        return newArray; 
    }
}

const usuario1 = new Usuario ("María", "Alvarez", [{titulo: "Harry Potter", autor: "J K Rowling"} , {titulo: "El Proceso", autor: "Kafka"}] ,  ["perro", "gato"]);

console.log (usuario1.getFullName());

usuario1.getFullName();

usuario1.addMascota("pez");

console.log(usuario1);

console.log (usuario1.countMascotas());

usuario1.countMascotas();

usuario1.addBook("El libro de la Selva", "Rudyard Kipling");

console.log (usuario1);

console.log (usuario1.getBookNames());