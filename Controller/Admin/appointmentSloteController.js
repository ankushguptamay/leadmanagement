const db = require('../../Models');
const { Op } = require("sequelize");
const { bookingSlote, getSloteForPatientValidation } = require("../../Middleware/validation");
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
        const { date, time, priceForIndian, priceForNonIndian } = req.body;
        const date1 = JSON.stringify(new Date());
        const date2 = JSON.stringify(new Date((new Date).getTime() + (1 * 24 * 60 * 60 * 1000)));
        const date3 = JSON.stringify(new Date((new Date).getTime() + (2 * 24 * 60 * 60 * 1000)));
        const date4 = JSON.stringify(new Date((new Date).getTime() + (3 * 24 * 60 * 60 * 1000)));
        const date5 = JSON.stringify(new Date((new Date).getTime() + (4 * 24 * 60 * 60 * 1000)));
        const date6 = JSON.stringify(new Date((new Date).getTime() + (5 * 24 * 60 * 60 * 1000)));
        const date7 = JSON.stringify(new Date((new Date).getTime() + (6 * 24 * 60 * 60 * 1000)));
        const array = [`${date1.slice(1, 11)}`, `${date2.slice(1, 11)}`, `${date3.slice(1, 11)}`, `${date4.slice(1, 11)}`,
        `${date5.slice(1, 11)}`, `${date6.slice(1, 11)}`, `${date7.slice(1, 11)}`]
        if (array.indexOf(date) === -1) {
            return res.status(400).send({
                success: false,
                message: "Can't create more then seven days slote!"
            });
        }
        for (let i = 0; i < time.length; i++) {
            await AppointmentSlote.create({
                createrCode: req.user.code,
                date: date,
                time: time[i],
                priceForIndian: priceForIndian,
                priceForNonIndian: priceForNonIndian
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
            where: { date: req.query.date },
            include: [{
                model: PatientAppointment,
                as: 'patientDetail'
            }]
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

exports.bookedSloteByDate = async (req, res) => {
    try {
        const slote = await AppointmentSlote.findAll({
            where: { status: "Booked", date: req.query.date },
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

exports.getSloteByDateForPatient = async (req, res) => {
    try {
        // validation
        const { error } = getSloteForPatientValidation(req.query);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const { date, country } = req.query;
        const date1 = JSON.stringify(new Date());
        const date2 = JSON.stringify(new Date((new Date).getTime() + (1 * 24 * 60 * 60 * 1000)));
        const date3 = JSON.stringify(new Date((new Date).getTime() + (2 * 24 * 60 * 60 * 1000)));
        const date4 = JSON.stringify(new Date((new Date).getTime() + (3 * 24 * 60 * 60 * 1000)));
        const date5 = JSON.stringify(new Date((new Date).getTime() + (4 * 24 * 60 * 60 * 1000)));
        const date6 = JSON.stringify(new Date((new Date).getTime() + (5 * 24 * 60 * 60 * 1000)));
        const date7 = JSON.stringify(new Date((new Date).getTime() + (6 * 24 * 60 * 60 * 1000)));
        const array = [`${date1.slice(1, 11)}`, `${date2.slice(1, 11)}`, `${date3.slice(1, 11)}`, `${date4.slice(1, 11)}`,
        `${date5.slice(1, 11)}`, `${date6.slice(1, 11)}`, `${date7.slice(1, 11)}`]
        if (array.indexOf(date) === -1) {
            return res.status(400).send({
                success: false,
                message: "Can't access more then seven days slote!"
            });
        }
        let slote;
        if (country === 'IN') {
            // console.log(country);
            slote = await AppointmentSlote.findAll({
                where: { date: date },
                attributes: ["id", "priceForIndian", "date", "time", "status", "createdAt", "updatedAt"]
            });
        } else {
            slote = await AppointmentSlote.findAll({
                where: { date: date },
                attributes: ["id", "priceForNonIndian", "date", "time", "status", "createdAt", "updatedAt"]
            });
        }
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

// for admin
exports.availableSlote = async (req, res) => {
    try {
        const slote = await AppointmentSlote.findAll({
            where: { status: "Available", date: req.query.date }
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

// for admin
exports.deleteSlote = async (req, res) => {
    try {
        const slote = await AppointmentSlote.findOne({
            where: { id: req.params.sloteId }
        });
        if (!slote) {
            res.status(400).send({
                success: false,
                message: "Appointment Slote is not present!"
            });
        }
        await slote.destroy();
        res.status(200).send({
            success: true,
            message: "Appointment Slote deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
