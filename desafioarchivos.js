const fs = require ("fs");

class Contenedor {
	constructor (archivo) {
		this.archivo = archivo;
	}
 
    save = async(producto)=>{
        try {
            
            if(fs.existsSync(this.archivo)){

            } else {
                let newProduct= {
                    id:1,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    thumbnail: producto.thumbnail
                }
            
            await fs.promises.writeFile(this.archivo, [newProduct]);
            return 1;
            
            }


        } catch (error) {
            console.log(error)
        }

    }

}

let contenedor = new Contenedor("productos.txt")

contenedor.save({nombre: "remera", precio: 1000, thumbnail: "https://www.cuestablanca.com/remera-manga-corta/p"})