const fs = require('fs').promises;

class ProductManager{

    constructor(path, nombrearchvio){
        this.path = path
        this.nombrearchivo = nombrearchvio
        
        this.archivo = path+nombrearchvio
    }


    async crearArchivo(){
        try {
           return await fs.writeFile(`${this.path}/${this.nombrearchivo}`,'');
        } catch (error) {
            console.log("Error al crerar el archivo :", error)
        }
    }

    async getProducts(){
        try {
            const data = await fs.readFile(this.archivo, 'utf8');
            if(!data){
                return []
            }else{
                return JSON.parse(data)
            }
            
        } catch (error) {
             console.error('Error al leer el archivo:'); // Maneja el error imprimiéndolo en la consola
        }
    }



    async addProduct(productos){
        try {
            fs.writeFile(this.archivo, JSON.stringify(productos, null, 2))  
        } catch (error) {
            console.log("Error al guardar producto en el acrhivo")
        }
    }

  
    
    

}

/* const hola = new ProductManager('../','productos.json')
 hola.crearArchivo() */ /* Esta funcion se debe ejecutar una sola vez, ya que crea el archivo  */

module.exports = ProductManager