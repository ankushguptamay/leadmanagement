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
// exports.bookedSlote = async (req, res) => {
//     try {
//         const slote = await AppointmentSlote.findAll({
//             where: { status: "Booked" },
//             include: [{
//                 model: PatientAppointment,
//                 as: 'patientDetail',
//                 order: [
//                     ['createdAt', 'DESC']
//                 ],
//             }]
//         });
//         res.status(200).send({
//             success: true,
//             message: "Booked slot fetched successfully!",
//             data: slote
//         });
//     } catch (err) {
//         res.status(500).send({
//             success: false,
//             message: err.message
//         });
//     }
// };

exports.getAppointmentSloteByDateForPatient = async (req, res) => {
    try {
        const date = req.query.date;
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
        const slote = await AppointmentSlote.findAll({
            where: { date: date }
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