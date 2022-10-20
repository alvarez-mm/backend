const fs = require ("fs");

class Contenedor {
	constructor (archivo) {
		this.archivo = archivo;
	}
 
    save = async(producto)=>{
        try {
            
            if(fs.existsSync(this.archivo)){
                let info = await fs.promises.readFile(this.archivo , "utf8");
                let result = JSON.parse(info);

                if (result.length>0) {
                let lastId
                let newProduct = {
                    id: lastId,
                    ...producto
                }
            } else {
                let lastId = 1
                let newProduct = {
                    id: lastId,
                    ...producto
                }
                result.push(newProduct);
                    await fs.promises.writeFile(this.archivo, JSON.stringify(result, null, 2))
                return lastId;
            }

            } else {
                let newProduct= {
                    id:1,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    thumbnail: producto.thumbnail
                }
            
            await fs.promises.writeFile(this.archivo, JSON.stringify ([newProduct], null, 2));
            return 1;
            
            }


        } catch (error) {
            console.log(error)
        }

    }

}

let contenedor = new Contenedor("productos.txt")

contenedor.save({nombre: "remera", precio: 1000, thumbnail: "https://www.cuestablanca.com/remera-manga-corta/p"})