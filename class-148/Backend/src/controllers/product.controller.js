import mongoose from "mongoose";
import ProductModel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";



/**
 * @desc Create a new product
 * @route POST /products
 * @access Private (Seller only)
 * @body { title, description, priceAmount, priceCurrency, images }
 */


export const createProduct = async (req, res) => {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile(file.buffer, file.originalname);
    }));

    const product = await ProductModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
    })

    return res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })
}


/**
 * @desc Get all products for the authenticated seller
 * @route GET /products/seller  
 * @access Private (Seller only)
 */


export const getSellerProducts = async (req, res) => {
    const seller = req.user;

    const products = await ProductModel.find({ seller: seller._id });

    return res.status(200).json({
        message: "Products retrieved successfully",
        success: true,
        products
    })
}

export const getAllProducts = async (req, res) => {
    const products = await ProductModel.find()

    return res.status(200).json({
        message: "Products retrieved successfully",
        success: true,
        products
    })

}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Fetching product ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            product
        });



    } catch (error) {
        console.error("Error fetching product:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
}