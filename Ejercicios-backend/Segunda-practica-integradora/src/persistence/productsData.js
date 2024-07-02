import express, { json } from 'express';
import mongoose from "mongoose";
import productModel from '../dao/models/products.model.js';

async function getProductsData(limite, pagina, order, disponible){
    let listProducts = await productModel.aggregate([
        {$sort: {price:order}} 
    ]); 
    listProducts = await productModel.paginate({disponible:disponible},{limit:limite,page:pagina});
    return listProducts
}

async function getProductIdData(idProduct){
    return await productModel.findById(idProduct);
};

async function newProductData(product){
    return await productModel.create(product);
}

async function putProductData(productID, product){
    return await productModel.updateOne({ _id: productID }, product)
}

async function deleteProductdata(idProduct){
    await productModel.deleteOne({_id:idProduct})
}

export default{
    getProductsData,
    getProductIdData,
    newProductData,
    putProductData,
    deleteProductdata
}