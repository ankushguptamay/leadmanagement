const db = require('../../Models');
const { Op } = require("sequelize");
const { createLeadValidation } = require("../../Middleware/validation");
const LeadProfile = db.leadProfile;
const UserInformation = db.userInformation;
const PreviousUpdateRecordLead = db.previousUpdateRecordLead;

exports.createLead = async (req, res) => {
    try {
        // Validate body
        const { error } = createLeadValidation(req.body);
        if (error) {
            // console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // generate lead code
        let code;
        const isLeadCode = await LeadProfile.findAll({
            paranoid: false,
            order: [
                ['createdAt', 'ASC']
            ],
            // attributes: [
            //     [Sequelize.fn('DISTINCT', Sequelize.col('leadCode')) ,'leadCode']
            // ]
        });
        if (isLeadCode.length == 0) {
            code = "LEAD" + 1000;
        } else {
            let lastLeadCode = isLeadCode[isLeadCode.length - 1];
            let lastDigits = lastLeadCode.leadCode.substring(4);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "LEAD" + incrementedDigits;
            //  console.log(code);
        }
        let createrCode;
        if (req.user) {
            createrCode = req.user.code;
        }
        await LeadProfile.create({
            ...req.body,
            createrCode: createrCode,
            leadCode: code
        });
        res.status(200).send({
            success: true,
            message: "Lead Profile Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// find all lead or by status for admin
exports.getAllLeadByStatus = async (req, res) => {
    try {
        let lead;
        if (req.query.status) {
            lead = await LeadProfile.findAll({
                where: {
                    [Op.and]: [{ status: req.query.status }, { assigned: true }]
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
        } else {
            lead = await LeadProfile.findAll({
                where: {
                    assigned: false
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
        }
        res.status(200).send({
            success: true,
            message: "Lead Profile fetched successfully!",
            data: lead
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// find lead by leadCode for admin/User
exports.getLeadByLeadCode = async (req, res) => {
    try {
        const lead = await LeadProfile.findOne({
            where: {
                leadCode: req.params.leadCode
            }
        });
        res.status(200).send({
            success: true,
            message: "Lead Profile fetched successfully!",
            data: lead
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// find all lead for user 
exports.getAllLeadForUser = async (req, res) => {
    try {
        const lead = await UserInformation.findOne({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }, { userCode: req.user.code }
                ]
            },
            include: [{
                model: LeadProfile,
                as: "leads",
                order: [
                    ['lead_To_User.createdAt', 'ASC']
                ],
                // attributes: ['id', 'name', 'phoneNumber'],
            }]
        })
        res.status(200).send({
            success: true,
            message: "Lead Profile fetched successfully!",
            data: lead
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.updateLeadProfile = async (req, res) => {
    try {
        const lead = await LeadProfile.findOne({
            where: { leadCode: req.params.leadCode }
        })
        if (!lead) {
            return res.status(400).send({
                success: false,
                message: "Lead Profile not found!"
            });
        }
        // save record in previousUpdateRecordLead table
        await PreviousUpdateRecordLead.create({
            name: lead.name,
            gender: lead.gender,
            jobTitle: lead.jobTitle,
            salutation: lead.salutation,
            leadOwner: lead.leadOwner,
            source: lead.source,
            status: lead.status,
            leadType: lead.leadType,
            requestType: lead.requestType,
            city: lead.city,
            country: lead.country,
            state: lead.state,
            website: lead.website,
            email: lead.email,
            selectedDisease: lead.selectedDisease,
            phoneNumber: lead.phoneNumber,
            whatsAppNumber: lead.whatsAppNumber,
            leadProfileCode: req.params.leadCode,
            createrCode: lead.createrCode,
            updaterCode: lead.updaterCode,
            assigned: lead.assigned,
            reminderDate: lead.reminderDate,
            reminderTime: lead.reminderTime

        })
        const { name, gender, jobTitle, salutation, leadOwner, source, status, leadType, requestType, city,
            country, state, website, email, phoneNumber, whatsAppNumber, selectedDisease, reminderDate, reminderTime } = req.body;
        await lead.update({
            ...lead,
            name: name,
            gender: gender,
            jobTitle: jobTitle,
            salutation: salutation,
            leadOwner: leadOwner,
            source: source,
            status: status,
            leadType: leadType,
            requestType: requestType,
            city: city,
            country: country,
            state: state,
            website: website,
            email: email,
            selectedDisease: selectedDisease,
            phoneNumber: phoneNumber,
            whatsAppNumber: whatsAppNumber,
            reminderDate: reminderDate,
            reminderTime: reminderTime,
            updaterCode: req.user.code

        })
        res.status(200).send({
            success: true,
            message: "Lead Profile updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err
        });
    }
}

// for admin
exports.deleteLead = async (req, res) => {
    try {
        await LeadProfile.destroy({
            where: {
                leadCode: req.params.leadCode
            },
            // force: true // If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option

        });
        res.status(200).send({
            success: true,
            message: "Lead Profile deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.restoreLead = async (req, res) => {
    try {
        await LeadProfile.restore({
            where: {
                leadCode: req.params.leadCode
            }
        });
        res.status(200).send({
            success: true,
            message: "Lead Profile restored successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.deleteAllPreviousLead = async (req, res) => {
    try {
        await PreviousUpdateRecordLead.destroy({
            where: {
                leadProfileCode: req.params.leadProfileCode
            }
        });
        res.status(200).send({
            success: true,
            message: "Previous Lead Profile deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.countLeadByStatusForAdmin = async (req, res) => {
    try {
        const { query } = req.query;
        let countLead;
        if (query) {
            countLead = await LeadProfile.count({ where: { status: query, assigned: true } });
        } else {
            countLead = await LeadProfile.count();
        }
        res.status(200).send({
            success: true,
            message: "Counted Lead successfully!",
            data: countLead
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.countNewLeadForAdmin = async (req, res) => {
    try {
        const countLead = await LeadProfile.count({ where: { assigned: false } });
        res.status(200).send({
            success: true,
            message: "Counted New Lead successfully!",
            data: countLead
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.countLeadAssignToUser = async (req, res) => {
    try {
        const status = req.query.status;
        const userCode = req.params.userCode;
        let user;
        if (status) {
            user = await UserInformation.findOne({
                where: { userCode: userCode },
                include: [{
                    model: LeadProfile,
                    as: "leads",
                    attributes: ["id", "status"],
                    where: { status: status }
                }]
            });
        } else {
            user = await UserInformation.findOne({
                where: { userCode: userCode },
                include: [{
                    model: LeadProfile,
                    as: "leads",
                    attributes: ["id", "status"]
                }]
            });
        }
        const count = user.leads.length;
        res.status(200).send({
            success: true,
            message: "Lead Count successfully!",
            data: { total: count }
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.deletePerticularPreviousLead = async (req, res) => {
    try {
        await PreviousUpdateRecordLead.destroy({
            where: {
                leadProfileCode: req.params.perviousLeadId
            }
        });
        res.status(200).send({
            success: true,
            message: "Previous Lead Profile deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.getAllPreviousLead = async (req, res) => {
    try {
        const previousLead = await PreviousUpdateRecordLead.findAll({
            where: {
                leadProfileCode: req.params.leadProfileCode
            }
        });
        res.status(200).send({
            success: true,
            message: "Previous Lead Profile fetched successfully!",
            data: previousLead
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}