const express = require('express');
const { getSloteByDateForPatient} = require('../Controller/Admin/appointmentSloteController');
const { bookPatientAppointment } = require('../Controller/Patient/patientAppointment');
const website = express.Router();

website.post("/bookPatientAppointment/:sloteId", bookPatientAppointment);// for patient
website.get("/getAppointmentSlote", getSloteByDateForPatient);

module.exports = website;