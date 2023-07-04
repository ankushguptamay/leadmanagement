const db = require('../../../Models');
const { Op } = require("sequelize");
const Category = db.category;
const { deleteSingleFile } = require('../../../Util/deleteFile')

exports.addCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload category thumbnail!"
            });
        }
        const { category } = req.body;
        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Category can't be blank!"
            });
        }
        let code;
        const isCategoryCode = await Category.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isCategoryCode.length == 0) {
            code = "CATEGORY" + 1000;
        } else {
            let lastCategoryCode = isCategoryCode[isCategoryCode.length - 1];
            let lastDigits = lastCategoryCode.categoryCode.substring(8);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "CATEGORY" + incrementedDigits;
            //  console.log(code);
        }
        await Category.create({
            category: category,
            categoryCode: code,
            categoryThumbnail: req.file.path,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Category Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.findAll({
            order: [
                ['category', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Category fetched successfully!",
            data: category
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                categoryCode: req.params.categoryCode
            }
        });
        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Category is not present!"
            });
        }
        if (category.categoryThumbnail) {
            deleteSingleFile(category.categoryThumbnail);
        }
        await category.destroy();
        res.status(200).send({
            success: true,
            message: "Category deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}
