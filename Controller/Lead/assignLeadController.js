const db = require('../../Models');
const { Op } = require("sequelize");
const { assignLeadToUser } = require("../../Middleware/validation");
const Lead_To_User = db.lead_To_User;

exports.assignLeadToUser = async (req, res) => {
    try {
         // Validate body
         const { error } = assignLeadToUser(req.body);
         if (error) {
             console.log(error);
             return res.status(400).send(error.details[0].message);
         }
        const leadCode = req.body.leadProfileCode; // should be array
        const userCode = req.body.userInformationCode; // should be array
        for (let i = 0; i < leadCode.length; i++) {
            for (let j = 0; j < userCode.length; j++) {
                await Lead_To_User.create({
                    leadProfileLeadCode: leadCode[i],
                    userInformationUserCode: userCode[j],
                    assignerCode: req.user.code
                });
            }
        }
        // const name = await UserInformation.findOne({where:{id:userId}});
        res.status(200).send({
            success: true,
            message: "Lead assign to user successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
