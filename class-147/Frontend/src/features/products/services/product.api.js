import axios from "axios";


const productsApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})

// Add a request interceptor to include the token in headers
export const createProduct = async (formData) => {

    const response = await productsApiInstance.post("/", formData);
    return response.data;
}

// Get products for the authenticated seller
export const getSellerProducts = async () => {
    const response = await productsApiInstance.get("/seller");
    return response.data;
}

export const getAllProducts = async () => {
    const response = await productsApiInstance.get("/");
    return response.data;
}