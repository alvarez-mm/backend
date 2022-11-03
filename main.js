const fs = require ("fs");


// DESAFIO SERVIDOR

const express = require ("express");
const aplicacion = express();
const port = 2000;

//---------


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


        getById = async(number) => {
            let productos = await this.getAll()
            const result = productos.filter(item => item.id === number);
            try {
                
                return (result) 

            } catch (error) {

            }
        }


        deleteById = async(number) => {
            let productos = await this.getAll()
            let result = (productos.slice(number));
            try {

                return fs.writeFileSync(this.archivo, (result, null, 2));

            } catch (error) {

            }
        }


        deleteAll = async(number) => {
            try {
                
                return fs.unlinkSync(this.archivo);

            } catch (error) {

            }
        }
            
    }



let contenedor = new Contenedor("productos.txt")


metodos=async()=>{
    await contenedor.save({nombre: "remera", precio: 1000, thumbnail: "https://www.cuestablanca.com/remera-manga-corta/p"});
    await contenedor.save({nombre: "pantalon", precio: 6000, thumbnail: "https://www.cuestablanca.com/pantalon/p"});
    await contenedor.save({nombre: "campera", precio: 9000, thumbnail: "https://www.cuestablanca.com/campera/p"});
//    console.log (await contenedor.getAll());
//    console.log (await contenedor.getById(2));
//    await contenedor.deleteById(2);
//    await contenedor.deleteAll();
}

metodos()




// ENDOPOINTS

aplicacion.get("/productos", async (peticion, respuesta) => {
    const all = await contenedor.getAll();
    respuesta.json(all);

});

aplicacion.get("/productoRandom", async (peticion, respuesta) => {
    const all = await contenedor.getAll();
    const random = Math.floor(Math.random() * all.length);
    const productoRandom = await contenedor.getById(random);
    respuesta.json(productoRandom);

});

//---------


// DESAFIO SERVIDOR

const servidor = aplicacion.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on("error", error => console.log(`Error: ${error}`));

//-------

