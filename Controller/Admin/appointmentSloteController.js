const db = require('../../Models');
const { Op } = require("sequelize");
const { bookingSlote } = require("../../Middleware/validation");
const AppointmentSlote = db.appointmentSlote;

exports.addAppointmentSlote = async (req, res) => {
    try {
        // Validate body
        const { error } = bookingSlote(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const {date, time} = req.body;
        await AppointmentSlote.create({
            createrCode: req.user.code,
            date:date,
            time:time
        });
        res.status(200).send({
            success: true,
            message: "Appointment Slote Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAppointmentSlote = async (req, res) => {
    try {
        const slote= await AppointmentSlote.create({
            createrCode: req.user.code,
            date:date,
            time:time
        });
        res.status(200).send({
            success: true,
            message: "Appointment Slote Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};