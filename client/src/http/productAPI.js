import {$authHost, $host} from "./index";
// import jwt_decode from "jwt-decode";

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product/', product)
    return data
}

export const updateProduct = async (id, productNewData) => {
    const {data} = await $authHost.put('api/product/update/' + id, productNewData)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $authHost.delete('api/product/delete/' + id)
    return data
}

export const getProducts = async () => {
    const {data} = await $host.get('api/product/')
    return data
}

export const getOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}