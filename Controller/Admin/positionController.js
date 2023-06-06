const db = require('../../Models');
const UserPosition = db.userPosition;
const { Op } = require("sequelize");

exports.addUserPosition = async (req, res) => {
    try {
        // Generating positionCode
        let code;
        const position = await UserPosition.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (position.length === 0) {
            code = "UPC" + 1000;
        } else {
            let lastPositionCode = position[position.length - 1];
            let lastDigits = lastPositionCode.positionCode.substring(3);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "UPC" + incrementedDigits;
            //  console.log(code);
        }
        await UserPosition.create({
            userPosition: req.body.userPosition,
            positionCode: code,
            adminInformationId: req.user.id
        });
        res.status(200).send({
            success: true,
            message: 'User Position created successfully!'
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getUserPosition = async (req, res) => {
    try {
        const position = await UserPosition.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: 'User Position fetched successfully!',
            data: position
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};


exports.updateUserPosition = async (req, res) => {
    try {
        const position = await UserPosition.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!position) {
            return res.status(400).send({
                success: false,
                message: "Position is not present!"
            })
        };
        await position.update({
            ...position,
            userPosition: req.body.userPosition

        });
        res.status(200).send({
            success: true,
            message: "User Position updated successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deleteUserPosition = async (req, res) => {
    try {
        const position = await UserPosition.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!position) {
            return res.status(400).send({
                success: false,
                message: "User Position is not present!"
            })
        };
        await position.destroy();
        res.status(200).send({
            success: true,
            message: "User Position delete successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}