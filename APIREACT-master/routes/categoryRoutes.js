const express = require("express");
const router = express.Router();
const Category = require("../models/categoriesModel.js");

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
        });
    }
});

router.get("/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
            });
        }
        res.json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
        });
    }
});

router.get("/store/:categoryId", async (req, res) => {
    try {
        const storeId = req.params.categoryId;

        console.log("storeId:", storeId);
        const categories = await Category.find({ storeId });

        res.json({
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, description, storeId } = req.body;

        const newCategory = new Category({ name, description, storeId });
        const savedCategory = await newCategory.save();

        res.json({
            success: true,
            data: savedCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
        });
    }
});

// Actualizar una categoría por su ID
router.put("/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const { name, description} = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, description },
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
            });
        }

        res.json({
            success: true,
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
        });
    }
});


module.exports = router;
