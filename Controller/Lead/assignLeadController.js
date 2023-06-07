const db = require('../../Models');
const { Op } = require("sequelize");
const Lead_To_User = db.lead_To_User;
const UserInformation = db.userInformation;

exports.assignLeadToUser = async (req, res) => {
    try {
        const leadCode = req.body.leadProfileCode; // should be array
        const userCode = req.body.userInformationCode;
        for (let i = 0; i < leadCode.length; i++) {
            await Lead_To_User.create({
                leadProfileLeadCode: leadCode[i],
                userInformationUserCode: userCode,
                assignerId: req.user.id
            });
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
