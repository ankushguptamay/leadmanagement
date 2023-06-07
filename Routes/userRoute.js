const express = require('express');
const { login, verifyLoginOtp, userInformation } = require('../Controller/User/userInformationCont');
const { createLead, getAllLeadForUser } = require('../Controller/Lead/leadProfileController');
const leadManagement = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isUserPresentAll } = require('../Middleware/isPresent');

leadManagement.post("/login", login);
leadManagement.post("/verifyLoginOtp", verifyLoginOtp);
leadManagement.get("/userInformation", jwt.verifyJWT, isUserPresentAll, userInformation);

leadManagement.post("/createLead", jwt.verifyJWT, isUserPresentAll, createLead);
leadManagement.get("/leadForUser", jwt.verifyJWT, isUserPresentAll, getAllLeadForUser);

module.exports = leadManagement;