const express = require('express');
const { getAppointmentSloteByDateForPatient, getAppointment } = require('../Controller/Admin/appointmentSloteController');
const { bookPatientAppointment } = require('../Controller/Patient/patientAppointment');
const website = express.Router();

website.post("/bookPatientAppointment/:sloteId", bookPatientAppointment);// for patient
website.get("/getAppointmentSlote", getAppointmentSloteByDateForPatient);
website.get("/getAppointment", getAppointment);

module.exports = website;