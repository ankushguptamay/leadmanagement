const db = require('../../Models');
const { appUserOrStudentRegistration } = require("../../Middleware/validation");
const { Op } = require("sequelize");
const AppUserOrStudent_Course = db.appUserOrStudent_Course;
const AppUserOrStudent = db.appUserOrStudent;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

// Only Admin can register an user
exports.registerEmployee = async (req, res) => {
    try {
        // Validate body
        const { error } = appUserOrStudentRegistration(req.body);
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
