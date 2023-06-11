const db = require('../../Models');
const { Op } = require("sequelize");
const { addPatientAppointment } = require("../../Middleware/validation");
const PatientAppointment = db.patientAppointment;
const AppointmentSlote = db.appointmentSlote;

exports.bookPatientAppointment = async (req, res) => {
    try {
        // Validate body
        const { error } = addPatientAppointment(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message);
        }
        const isSlote = await AppointmentSlote.findOne({
            where: {
                [Op.and]: [{ id: req.params.sloteId }, { status: null }]
            }
        })
        if (!isSlote) {
            return res.status(400).send({
                success: false,
                message: "This slote has allready booked!"
            })
        }
        const { fullName, gender, age, patientProblem } = req.body;
        const patientAppointment = await PatientAppointment.create({
            date: isSlote.date,
            time: isSlote.time,
            fullName: fullName,
            age: age,
            gender: gender,
            patientProblem: patientProblem,
            status: 'Booked',
            appointmentSloteId: req.params.sloteId

        });
        await isSlote.update({
            ...isSlote,
            status: "Booked"
        })
        res.status(200).send({
            success: true,
            message: "Your Appointment Booked successfully!",
            data: patientAppointment
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};
