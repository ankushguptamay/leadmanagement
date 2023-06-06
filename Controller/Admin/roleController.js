const db = require('../../Models');
const UserRole = db.userRole;
const { Op } = require("sequelize");

exports.addUserRole = async (req, res) => {
    try {
        // Generating RoleCode
        let code;
        const role = await UserRole.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (role.length === 0) {
            code = "URC" + 1000;
        } else {
            let lastRoleCode = role[role.length - 1];
            let lastDigits = lastRoleCode.roleCode.substring(3);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "URC" + incrementedDigits;
            //  console.log(code);
        }
        await UserRole.create({
            userRole: req.body.userRole,
            roleCode: code,
            adminInformationId: req.user.id
        });
        res.status(200).send({
            success: true,
            message: 'User Role created successfully!'
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getUserRole = async (req, res) => {
    try {
        const role = await UserRole.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: 'User Role fetched successfully!',
            data: role
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};


exports.updateUserRole = async (req, res) => {
    try {
        const role = await UserRole.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!role) {
            return res.status(400).send({
                success: false,
                message: "Role is not present!"
            })
        };
        await role.update({
            ...role,
            userRole: req.body.userRole

        });
        res.status(200).send({
            success: true,
            message: "User Role updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deleteUserRole = async (req, res) => {
    try {
        const role = await UserRole.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!role) {
            return res.status(400).send({
                success: false,
                message: "User Role is not present!"
            })
        };
        await role.destroy();
        res.status(200).send({
            success: true,
            message: "User Role delete successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}