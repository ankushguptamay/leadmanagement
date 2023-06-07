const db = require('../../Models');
const { Op } = require("sequelize");
const Lead_To_User = db.lead_To_User;
const UserInformation = db.userInformation;

exports.assignLeadToUser = async (req, res) => {
    try {
        const leadId = req.body.leadProfileId; // should be array
        const userId = req.body.userInformationId;
        for (let i = 0; i < leadId.length; i++) {
            await Lead_To_User.create({
                leadProfileId: leadId[i],
                userInformationId: userId,
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
