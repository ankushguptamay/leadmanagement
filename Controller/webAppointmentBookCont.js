const db = require('../Models');
const { Op } = require("sequelize");
const { addPatientAppointment } = require("../Middleware/validation");
const AppointmentSlote = db.appointmentSlote;

exports.bookWebSiteAppointment = async (req, res) => {
    try {
        // Validate body
        const { error } = addPatientAppointment(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const isSlote = await AppointmentSlote.findOne({
            where: {
                [Op.and]: [
                    { id: req.params.sloteId },
                    { appointmentStatus: "Active" },
                    { bookingStatus: "Available" }
                ]
            }
        })
        if (!isSlote) {
            return res.status(400).send({
                success: false,
                message: "This slote has already booked!"
            })
        }
        const { patientName, patientGender, patientAge, patientProblem, patientPhoneNumber } = req.body;
        const slote = await isSlote.update({
            ...isSlote,
            patientAge: patientAge,
            patientGender: patientGender,
            patientName: patientName,
            patientPhoneNumber: patientPhoneNumber,
            patientProblem: patientProblem,
            bookingStatus: "Booked"
        })
        res.status(200).send({
            success: true,
            message: "Your Appointment Booked successfully!",
            data: slote
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getBookedAppointment = async (req, res) => {
    try {
        const phoneNumber = req.query.phoneNumber;
        if (phoneNumber.length === 10) {
            const isSlote = await AppointmentSlote.findAll({
                where: {
                    [Op.and]: [
                        { patientPhoneNumber: phoneNumber },
                        { bookingStatus: "Booked" }
                    ]
                }
            });
            res.status(200).send({
                success: true,
                message: "Your Booked appointment fetched successfully!",
                data: isSlote
            });
        } else {
            res.status(400).send({
                success: false,
                message: "10 digits Phone Number is required!"
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
