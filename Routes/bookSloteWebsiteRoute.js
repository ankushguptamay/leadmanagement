const express = require('express');
const { getSloteByDateForPatient } = require('../Controller/Admin/appointmentSloteController');
const { bookWebSiteAppointment, getBookedAppointment } = require('../Controller/webAppointmentBookCont');
const website = express.Router();

website.post("/bookPatientAppointment/:sloteId", bookWebSiteAppointment);
website.get("/getAppointmentSlote", getSloteByDateForPatient);
website.get("/getBookedAppointment", getBookedAppointment);

module.exports = website;