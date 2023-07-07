const express = require('express');
const { register, loginAppUser, verifyLoginOtp, getAppUserForAppUser } = require('../Controller/AppUser/appUserController');
const { getAllCourse } = require('../Controller/Admin/courseController');
const appUser = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isAppUserPresent } = require('../Middleware/isPresent');

appUser.post("/register", register);
appUser.post("/login", loginAppUser);
appUser.post("/verifyLoginOtp", verifyLoginOtp);
appUser.get("/getAppUser", jwt.verifyAppUserJWT, isAppUserPresent, getAppUserForAppUser);

appUser.get("/getAllCourse", jwt.verifyAppUserJWT, isAppUserPresent, getAllCourse);

module.exports = appUser;