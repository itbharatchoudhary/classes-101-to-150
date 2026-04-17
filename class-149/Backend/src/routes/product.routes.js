import express from "express";
import { AuthenticateSeller } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts, getSellerProducts } from "../controllers/product.controller.js";
import { validateProductCreation } from "../validator/product.validator.js";
import muiter from "multer";

const upload = muiter({
    storage: muiter.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

const router = express.Router();

/**
 * @route POST /products
 * @desc Create a new product
 * @access Private (Seller only)
 * @body { title, description, priceAmount, priceCurrency, images } 
 */
router.post("/", AuthenticateSeller, upload.array("images", 7), validateProductCreation, createProduct);

/**
 * @route GET /products/seller
 * @desc Get all products for the authenticated seller
 * @access Private (Seller only)
 */

router.get("/seller", AuthenticateSeller, getSellerProducts);

router.get("/",getAllProducts)

export default router;