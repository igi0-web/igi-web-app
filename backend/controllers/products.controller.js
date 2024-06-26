import errorHandler from "../utils/custom.error.handler.js";
import { Product, Category } from "../models/product.model.js";
import mongoose from 'mongoose';
import { generateBlurHashFromImageUrl } from "../utils/imagesFunctions.js"
import { deleteImageFromFirebase } from "../utils/firebaseFunctions.js";


// Product Category Controller =============================================

export const createCategory = async (req, res, next) => {

    try {
        if (req.admin && req.admin.id != req.params.adminId) {
            return next(errorHandler(401, "You can only create categories from your own account!"));
        }
        const cat = await Category.create(req.body);
        return res.status(201).json(cat);
    } catch (error) {
        next(error);
    }

}

export const editCategory = async (req, res, next) => {
    const cat = await Category.findById(req.params.id);
    if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only edit categories from your own account!"));
    }
    if (!cat) {
        return next(errorHandler(404, "Category not found!"));
    }
    try {


        const updatedCat = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCat);
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();


        if (req.admin && req.admin.id !== req.params.adminId) {
            return next(errorHandler(401, "You can only delete categories from your own account!"));
        }


        const cat = await Category.findById(req.params.id);

        if (!cat) {
            await session.abortTransaction();
            session.endSession();
            return next(errorHandler(404, "Category not found!"));
        }


        const products = await Product.find({ category: req.params.id });


        for (let i = 0; i < products.length; i++) {
            if (products[i].imageUrl) {

                await deleteImageFromFirebase(products[i].imageUrl);
            }

        }
        await Product.deleteMany({ category: req.params.id });
        await Category.findByIdAndDelete(req.params.id);
        await session.commitTransaction();
        session.endSession();

        res.status(200).json("Category and its products have been deleted!");
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        next(error);
    }
};


export const getCategories = async (req, res, next) => {
    try {
        const cat = await Category.find({}).sort({ createdAt: -1 });
        
        if (cat.length == 0) {
            return next(errorHandler(404, "No categories found!"));
        }
        res.status(200).json(cat);
    } catch (error) {
        next(error);
    }

}

export const getCategoryById = async (req, res, next) => {
    try {
        const cat = await Category.findById(req.params.id);
        if (!cat) {
            return next(errorHandler(404, "Category not found!"));
        }

        res.status(200).json(cat);
    } catch (error) {
        next(error);
    }
};



// Products Controller ==========================================================

export const searchProducts = async (req, res, next) => {
    const query = req.query.queryTerm;
    
    if (query != undefined && query != "") {
        try {
            const products = await Product.find({
                code: {
                    $regex: query,
                    $options: "i"
                }
            }).populate('category', 'name');
            if (products.length == 0) {
                return next(errorHandler(404, "No products found!"));
            }
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

}

export const getProducts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || null;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const products = await Product.find({})
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIndex);

        if (products.length === 0) {
            return next(errorHandler(404, "No products found!"));
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}


export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) {
            return next(errorHandler(404, "Product not found!"));
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        if (req.admin && req.admin.id != req.params.adminId) {
            return next(errorHandler(401, "You can only create products from your own account!"));
        }
        const categoryExists = await Category.findById(req.body.category);
        if (!categoryExists) {
            return next(errorHandler(400, "Invalid Category ID!"));
        }
        const { imageUrl } = req.body;
        const imageBlur = await generateBlurHashFromImageUrl(imageUrl);
        const product = await Product.create({
            ...req.body,
            blurhash: imageBlur
        });
        return res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};


export const editProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only create products from your own account!"));
    }
    if (!product) {
        return next(errorHandler(404, "Product not found!"));
    }
    try {
        let { category } = req.body;
        category = new mongoose.Types.ObjectId(category);
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return next(errorHandler(400, "Invalid Category ID!"));
        }
        req.body.category = category;
        const { imageUrl } = req.body;
        const imageBlur = await generateBlurHashFromImageUrl(imageUrl);
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                blurhash: imageBlur
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};


export const deleteProduct = async (req, res, next) => {
    if (req.admin && req.admin.id != req.params.adminId) {
        return next(errorHandler(401, "You can only delete products from your own account!"));
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(errorHandler(404, "Product not found!"));
    }
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!");
    } catch (error) {
        next(error);
    }
};


export const get6Products = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .sort({ createdAt: -1 })
            .limit(6);
        
        if (!products || products.length === 0) {
            return next(errorHandler(404, "No products found!"));
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}