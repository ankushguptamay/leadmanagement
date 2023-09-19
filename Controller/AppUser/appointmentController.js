const db = require('../../Models');
const { Op } = require("sequelize");
const { addPatientAppointment } = require("../../Middleware/validation");
const AppointmentSlote = db.appointmentSlote;

exports.bookAppUserAppointment = async (req, res) => {
    try {
        // Validate body
        const { error } = addPatientAppointment(req.body);
        if (error) {
            // console.log(error);
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
            bookingStatus: "Booked",
            appUserId: req.appUser.id
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

exports.getMyBookedAppointment = async (req, res) => {
    try {
        const isSlote = await AppointmentSlote.findAll({
            where: {
                [Op.and]: [
                    { appUserId: req.appUser.id },
                    { bookingStatus: "Booked" }
                ]
            }
        });
        res.status(200).send({
            success: true,
            message: "Your Booked appointment fetched successfully!",
            data: isSlote
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
