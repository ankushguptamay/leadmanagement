const express = require('express');
const { register, loginAppUser, verifyLoginOtp, getAppUserForAppUser } = require('../Controller/AppUser/appUserController');
const { getAllCourse } = require('../Controller/Admin/courseController');
const { getAllBanner } = require('../Controller/Admin/Master/bannerController');
const { getAllCategory } = require('../Controller/Admin/Master/categoryController');
const { getAppointmentSloteByDateForPatient } = require('../Controller/Admin/appointmentSloteController');
const { bookPatientAppointment } = require('../Controller/Patient/patientAppointment');
const appUser = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isAppUserPresent } = require('../Middleware/isPresent');

appUser.post("/register", register);
appUser.post("/login", loginAppUser);
appUser.post("/verifyLoginOtp", verifyLoginOtp);
appUser.get("/getAppUser", jwt.verifyAppUserJWT, isAppUserPresent, getAppUserForAppUser);

appUser.get("/getAllCourse", jwt.verifyAppUserJWT, isAppUserPresent, getAllCourse);

appUser.post("/bookPatientAppointment/:sloteId", jwt.verifyAppUserJWT, isAppUserPresent, bookPatientAppointment);
appUser.get("/getAppointmentSlote", jwt.verifyAppUserJWT, isAppUserPresent, getAppointmentSloteByDateForPatient);

appUser.get("/getAllCategory", jwt.verifyAppUserJWT, isAppUserPresent, getAllCategory);
appUser.get("/getAllBanner", jwt.verifyAppUserJWT, isAppUserPresent, getAllBanner);

module.exports = appUser;