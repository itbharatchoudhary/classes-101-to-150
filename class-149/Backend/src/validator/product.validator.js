import {body, validationResult} from "express-validator";

function validateRequest(req,res,next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }       
    next();
}

export const validateProductCreation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").isIn(["USD", "EUR", "INR", "JPY", "GBP"]).withMessage("Invalid currency"),
    validateRequest
]