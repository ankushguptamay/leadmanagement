const db = require('../../Models');
const { Op } = require("sequelize");
const LeadOrganisation = db.leadOrganisation;

exports.createLeadOrganisation = async (req, res) => {
    try {
        await LeadOrganisation.create({
            ...req.body,
            createrId: req.user.id,
            leadProfileId: req.body.leadProfileId
        });
        res.status(200).send({
            success: true,
            message: "Lead Ogranisation Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.updateLeadOrganisation = async (req, res) => {
    try {
        const leadOrganisation = await LeadOrganisation.findOne({
            where: { id: req.params.id }
        });
        if (!leadOrganisation) {
            return res.status(400).send({
                success: false,
                message: "Lead Organisation is not present!"
            })
        };
        const { organisation, annualRevenue, territary, numberOfEmployees, industry, marketSegment } = req.body;
        await leadOrganisation.update({
            ...leadOrganisation,
            createrId: req.user.id,
            marketSegment: marketSegment,
            industry: industry,
            numberOfEmployees: numberOfEmployees,
            annualRevenue: annualRevenue,
            organisation: organisation,
            territary: territary
        });
        res.status(200).send({
            success: true,
            message: "Lead Ogranisation updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
