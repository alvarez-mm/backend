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
                let lastId = result [result.length-1].id+1
                let newProduct = {
                    id: lastId,
                    ...producto
                }
                result.push(newProduct);
                    await fs.promises.writeFile(this.archivo, JSON.stringify(result, null, 2))
                return lastId;
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
        getAll = async () => {
            try {
                if(fs.existsSync(this.archivo)) {
                    let info = await fs.promises.readFile(this.archivo, "utf8")
                
                let result = JSON.parse(info);
                return result;

                } else {
                    return "No se encontró el archivo"
                }
            } catch (error) {

            }
        }

    }



let contenedor = new Contenedor("productos.txt")


metodos=async()=>{
    await contenedor.save({nombre: "remera", precio: 1000, thumbnail: "https://www.cuestablanca.com/remera-manga-corta/p"});
    await contenedor.save({nombre: "pantalon", precio: 6000, thumbnail: "https://www.cuestablanca.com/pantalon/p"});
    await contenedor.save({nombre: "campera", precio: 9000, thumbnail: "https://www.cuestablanca.com/campera/p"});
    console.log (await contenedor.getAll())
}

metodos()

