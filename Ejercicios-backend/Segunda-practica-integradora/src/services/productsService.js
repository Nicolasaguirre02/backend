import dataProducts from '../persistence/productsData.js'

async function getProductsService(limite, pagina, order, disponible){
    const respuestaProduct = await dataProducts.getProductsData(limite, pagina, order, disponible);
    return respuestaProduct;
}

async function getProductIdService(idProduct){
    const respuestaProduct = await dataProducts.getProductIdData(idProduct);
    return respuestaProduct
};

async function newProductService(product){
    const respuestaProduct = await dataProducts.newProductData(product);
    return respuestaProduct;
}



async function putProductService(idProduct, productModificado){
    let product = await dataProducts.getProductIdData(idProduct);
    console.log(product)
    product = productModificado;
    const respuestaProduct = await dataProducts.putProductData(idProduct, product);
    return respuestaProduct;
}


async function deleteProductService(idProduct){
    let respuestaProduct = await dataProducts.deleteProductdata(idProduct);
    return respuestaProduct
}

export default {
    getProductsService,
    getProductIdService,
    newProductService,
    putProductService,
    deleteProductService
}