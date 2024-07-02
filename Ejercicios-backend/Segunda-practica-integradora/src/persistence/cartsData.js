import express, { json } from 'express';
import mongoose from "mongoose";
import cartsModel from '../dao/models/carts.model.js';

async function getAllCartsData(){
    return await cartsModel.find();
}

async function getCartIdData(idCart){
    return cartsModel.findById(idCart).populate('products.product');
}

async function newCartData(newCart){
    return await cartsModel.create(newCart);
}

async function newProductToCartData(cartSelect){
    await cartSelect.save()
}

async function deletProdcutFromCartData(cart){
    return  await cart.save()
}


async function deleteAllProductsFromCartData(cart){
    return await cart.save();
}

export default{
    getAllCartsData,
    getCartIdData,
    newCartData,
    newProductToCartData,
    deletProdcutFromCartData,
    deleteAllProductsFromCartData
}

