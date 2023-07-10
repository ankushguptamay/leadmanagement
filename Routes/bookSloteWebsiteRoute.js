const express = require('express');
const { getAppointmentSloteByDateForPatient, getAppointment } = require('../Controller/Admin/appointmentSloteController');
const { bookPatientAppointment } = require('../Controller/Patient/patientAppointment');
const { getAdminEmployee } = require('../Controller/Admin/authController');
const website = express.Router();

website.post("/bookPatientAppointment/:sloteId", bookPatientAppointment);// for patient
website.get("/getAppointmentSlote", getAppointmentSloteByDateForPatient);
website.get("/getAppointment", getAppointment);

website.get("/getAdminEmployee", getAdminEmployee);

module.exports = website;