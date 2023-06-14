const db = require('../../Models');
const { Op } = require("sequelize");
const { assignLeadToUser, rollBackAssign } = require("../../Middleware/validation");
const Lead_To_User = db.lead_To_User;
const LeadProfile = db.leadProfile;

exports.assignLeadToUser = async (req, res) => {
    try {
        // Validate body
        const { error } = assignLeadToUser(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        let count = 0;
        const leadCode = req.body.leadProfileCode; // should be array
        const userCode = req.body.userInformationCode; // should be string
        for (let i = 0; i < leadCode.length; i++) {
            const isAssign = await Lead_To_User.findOne({
                where: {
                    [Op.and]: [
                        { leadProfileLeadCode: leadCode[i] }, { userInformationUserCode: userCode }
                    ]
                }
            });
            if (!isAssign) {
                await Lead_To_User.create({
                    leadProfileLeadCode: leadCode[i],
                    userInformationUserCode: userCode,
                    assignerCode: req.user.code
                });
                await LeadProfile.update(
                    { assigned: true },
                    {
                        where: {
                            leadCode: leadCode[i]
                        }
                    }
                )
                count = count + 1;
            }

        }
        // const name = await UserInformation.findOne({where:{id:userId}});
        res.status(200).send({
            success: true,
            message: `${count} Lead assign to user successfully!`
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.rollBackAssign = async (req, res) => {
    try {
        // Validate body
        const { error } = rollBackAssign(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const leadCode = req.body.leadProfileCode;
        const userCode = req.body.userInformationCode;
        await Lead_To_User.destroy({
            where: {
                [Op.and]: [
                    { leadProfileLeadCode: leadCode }, { userInformationUserCode: userCode }
                ]
            },
            force: true // If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option

        });
        res.status(200).send({
            success: true,
            message: "Roll back assigned lead to user successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}