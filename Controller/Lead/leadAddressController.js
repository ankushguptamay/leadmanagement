const db = require('../../Models');
const { Op } = require("sequelize");
const LeadAddress = db.leadAddress;

exports.createLeadAddress = async (req, res) => {
    try {
        await LeadAddress.create({
            ...req.body,
            createrId: req.user.id,
            leadProfileId: req.body.leadProfileId
        });
        res.status(200).send({
            success: true,
            message: "Lead Address Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.updateLeadAddress = async (req, res) => {
    try {
        const leadAddress = await LeadAddress.findOne({
            where: { id: req.params.id }
        });
        if (!leadAddress) {
            return res.status(400).send({
                success: false,
                message: "Lead Address is not present!"
            })
        };
        const { city, state, country } = req.body;
        await leadAddress.create({
            ...leadAddress,
            createrId: req.user.id,
            city: city,
            state: state,
            country: country
        });
        res.status(200).send({
            success: true,
            message: "Lead Address updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};