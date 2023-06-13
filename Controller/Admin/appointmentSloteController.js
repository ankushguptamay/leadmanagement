const db = require('../../Models');
const { Op } = require("sequelize");
const { bookingSlote } = require("../../Middleware/validation");
const AppointmentSlote = db.appointmentSlote;
const PatientAppointment = db.patientAppointment;

exports.addAppointmentSlote = async (req, res) => {
    try {
        // Validate body
        const { error } = bookingSlote(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { date, time, name, phoneNumber } = req.body;
        for (let i = 0; i < time.length; i++) {
            await AppointmentSlote.create({
                createrCode: req.user.code,
                date: date,
                time: time[i],
                name: name,
                phoneNumber: phoneNumber
            });
        }
        res.status(200).send({
            success: true,
            message: `${time.length} Appointment Slote Created successfully!`
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAppointmentSloteByDate = async (req, res) => {
    try {
        const slote = await AppointmentSlote.findAll({
            where: { date: req.query.date }
        });
        res.status(200).send({
            success: true,
            message: "Appointment Slote fetched by date successfully!",
            data: slote
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

// work as notification to admin
exports.bookedSlote = async (req, res) => {
    try {
        const slote = await AppointmentSlote.findAll({
            where: { status: "Booked" },
            include: [{
                model: PatientAppointment,
                as: 'patientDetail',
                order: [
                    ['createdAt', 'DESC']
                ],
            }]
        });
        res.status(200).send({
            success: true,
            message: "Booked slot fetched successfully!",
            data: slote
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};