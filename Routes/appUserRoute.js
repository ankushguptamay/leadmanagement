const express = require('express');
const { register, loginAppUser, verifyLoginOtp, getAppUserForAppUser, addOrUpdateProfileImage, removeProfileImage } = require('../Controller/AppUser/appUserController');
const { getAllCourse, getCourseContentForAppUser } = require('../Controller/Admin/courseController');
const { getNoteByContentForAppUser } = require('../Controller/Admin/contentNotesController');
const { getCourseContentByContentId } = require('../Controller/Admin/courseContentController');
const { getAllBanner } = require('../Controller/Admin/Master/bannerController');
const { getAllCategory } = require('../Controller/Admin/Master/categoryController');
const { getAllAppointmentBanner } = require('../Controller/Admin/Master/appointmentBannerCont');
const { getSloteByDateForPatient } = require('../Controller/Admin/appointmentSloteController');
const { bookAppUserAppointment, getMyBookedAppointment } = require('../Controller/AppUser/appointmentController');
const { purchaseCourse, getAssignCourse } = require('../Controller/AppUser/courseModel');
const appUser = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isAppUserPresent } = require('../Middleware/isPresent');
const uploadImage = require('../Middleware/uploadFile/uploadImage');

appUser.post("/register", register);
appUser.post("/login", loginAppUser);
appUser.post("/verifyLoginOtp", verifyLoginOtp);
appUser.get("/getAppUser", jwt.verifyAppUserJWT, isAppUserPresent, getAppUserForAppUser);
appUser.post("/addOrUpdateProfileImage", jwt.verifyAppUserJWT, isAppUserPresent, uploadImage.single('profileImage'), addOrUpdateProfileImage);
appUser.delete("/removeProfileImage", jwt.verifyAppUserJWT, isAppUserPresent, removeProfileImage);

appUser.get("/getAllCourse", jwt.verifyAppUserJWT, isAppUserPresent, getAllCourse);
appUser.get("/getCourse/:id", jwt.verifyAppUserJWT, isAppUserPresent, getCourseContentForAppUser);
appUser.get("/content/:id", jwt.verifyAppUserJWT, isAppUserPresent, getCourseContentByContentId); // contentId
appUser.get("/getNotes/:id", jwt.verifyAppUserJWT, isAppUserPresent, getNoteByContentForAppUser); // contentId
appUser.get("/myCourses", jwt.verifyAppUserJWT, isAppUserPresent, getAssignCourse);
appUser.post("/purchaseCourse/:id", jwt.verifyAppUserJWT, isAppUserPresent, purchaseCourse);

appUser.post("/bookAppointment/:sloteId", jwt.verifyAppUserJWT, isAppUserPresent, bookAppUserAppointment);
appUser.get("/getAppointmentSlote", jwt.verifyAppUserJWT, isAppUserPresent, getSloteByDateForPatient);
appUser.get("/myBookedAppointment", jwt.verifyAppUserJWT, isAppUserPresent, getMyBookedAppointment);

appUser.get("/getAllAppointmentBanner", jwt.verifyAppUserJWT, isAppUserPresent, getAllAppointmentBanner);
appUser.get("/getAllCategory", jwt.verifyAppUserJWT, isAppUserPresent, getAllCategory);
appUser.get("/getAllBanner", jwt.verifyAppUserJWT, isAppUserPresent, getAllBanner);

module.exports = appUser;