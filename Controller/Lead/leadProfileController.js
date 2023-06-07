const db = require('../../Models');
const { Op } = require("sequelize");
const { createLeadValidation } = require("../../Middleware/validation");
const LeadProfile = db.leadProfile;
const UserInformation = db.userInformation;

exports.createLead = async (req, res) => {
    try {
        // Validate body
        const { error } = createLeadValidation(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // generate lead code
        let code;
        const isLeadCode = await LeadProfile.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
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
        let createrId;
        if (req.user) {
            createrId = req.user.id;
        }
        await LeadProfile.create({
            ...req.body,
            createrId: createrId,
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
                    status: req.query.status
                },
                order: [
                    ['createdAt', 'ASC']
                ]
            });
        } else {
            lead = await LeadProfile.findAll({
                order: [
                    ['createdAt', 'ASC']
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

// find all lead for user 
exports.getAllLeadForUser = async (req, res) => {
    try {
        const lead = await UserInformation.findOne({
            where: {
                [Op.and]: [
                    { id: req.user.id }, { email: req.user.email }, { userCode: req.user.userCode }
                ]
            },
            include: [{
                model: LeadProfile,
                as: "leads",
                order: [
                    ['createdAt', 'ASC']
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

exports.updateLeadProfile = async (req, res) => {
    try {
        const lead = await LeadProfile.findOne({
            where:  { leadCode: req.params.leadCode }
        })
        if(!lead){
            return res.status(400).send({
                success: false,
                message: "Lead Profile not found!"
            });
        }
        await lead.destroy();
        const{name, gender, jobTitle, salutation, leadOwner, source, status, leadType, requestType, city, country,state, website, email, phoneNumber,whatsAppNumber}=req.body;
        await LeadProfile.create({
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
            email:email,
            phoneNumber: phoneNumber,
            whatsAppNumber: whatsAppNumber,
            leadCode: req.params.leadCode,
            createrId: req.user.id
        })
        res.status(200).send({
            success: true,
            message: "Lead Profile updated successfully!",
            data: lead
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}