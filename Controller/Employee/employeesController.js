const db = require('../../Models');
const { employeeRegistration } = require("../../Middleware/validation");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const EmployeesInformation = db.employeesInformation;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, JWT_SECRET_KEY, JWT_VALIDITY } = process.env;

const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

// Only Admin can register an user
exports.registerEmployee = async (req, res) => {
    try {
        // Validate body
        const { error } = employeeRegistration(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        // Checking is mobile number and Email allready present
        const employee = await EmployeesInformation.findOne({
            where: {
                [Op.or]: [
                    { phoneNumber: req.body.phoneNumber }, { email: req.body.email }
                ]
            }
        });
        if (employee) {
            return res.status(400).send({
                success: false,
                message: "Employee already registered!"
            });
        }
        // check in deleted
        const checkSoftDelete = await EmployeesInformation.findOne({
            where: {
                [Op.or]: [
                    { phoneNumber: req.body.phoneNumber }, { email: req.body.email }
                ]
            },
            paranoid: false
        });
        if (checkSoftDelete) {
            return res.status(400).send({
                success: false,
                message: "Employee already registered in soft delete! Restore it?",
                data: checkSoftDelete
            });
        }
        // generate employee code
        let code;
        const isEmployeeCode = await EmployeesInformation.findAll({
            paranoid: false,
            order: [
                ['createdAt', 'ASC']
            ],
            // attributes: [
            //     [Sequelize.fn('DISTINCT', Sequelize.col('employeesCode')) ,'employeesCode']
            // ]
        });
        if (isEmployeeCode.length == 0) {
            code = "USER" + 1000;
        } else {
            let lastEmployeeCode = isEmployeeCode[isEmployeeCode.length - 1];
            let lastDigits = lastEmployeeCode.employeesCode.substring(4);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "USER" + incrementedDigits;
            //  console.log(code);
        }
        // Creating Employee Information
        await EmployeesInformation.create({
            ...req.body,
            createrCode: req.user.code,
            employeesCode: code
        });
        res.status(200).send({
            success: true,
            message: "Employee Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// for admin not deleted
exports.allEmployeesInformation = async (req, res) => {
    try {
        const employee = await EmployeesInformation.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Employees Information fetched successfully!",
            data: employee
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deletedEmployeesInformation = async (req, res) => {
    try {
        const employee = await EmployeesInformation.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).send({
            success: true,
            message: " Deleted Employees Information fetched successfully!",
            data: employee
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// search employee for create user
exports.searchEmployees = async (req, res) => {
    try {
        const { query } = req.query;
        const employee = await EmployeesInformation.findAll({
            where: {
                [Op.or]: [{ name: query }, { email: query }, { phoneNumber: query }, { employeesCode: query }]
            },
            order: [
                ['createdAt', 'DESC'],
                ["name", "ASC"]
            ]
        });
        res.status(200).send({
            success: true,
            message: "Employees Information fetched successfully!",
            data: employee
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.deleteEmployees = async (req, res) => {
    try {
        await EmployeesInformation.destroy({
            where: {
                employeesCode: req.params.employeesCode
            },
            // force: true // If you really want a hard-deletion and your model is paranoid, you can force it using the force: true option

        });
        res.status(200).send({
            success: true,
            message: "Employees Information deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

exports.restoreEmployee = async (req, res) => {
    try {
        await EmployeesInformation.restore({
            where: {
                employeesCode: req.params.employeesCode
            }
        });
        res.status(200).send({
            success: true,
            message: "Employee Information restored successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}