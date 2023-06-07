const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { createLead, getAllLeadByStatus } = require('../Controller/Lead/leadProfileController');
const { registerUser, users } = require('../Controller/User/userInformationCont');
const { assignLeadToUser } = require('../Controller/Lead/assignLeadController');
const leadManagement = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isAdminPresent } = require('../Middleware/isPresent');

leadManagement.post("/register", registerAdmin);
leadManagement.post("/login", loginAdmin);
leadManagement.get("/information", jwt.verifyJWT, getAdmin);
leadManagement.put("/updateInformation", jwt.verifyJWT, updateAdminName);

leadManagement.post("/registerUser", jwt.verifyJWT, isAdminPresent, registerUser);
leadManagement.get("/users", jwt.verifyJWT, isAdminPresent, users);

leadManagement.post("/createLead", jwt.verifyJWT, isAdminPresent, createLead);
leadManagement.get("/leadByStatus", jwt.verifyJWT, isAdminPresent, getAllLeadByStatus);

leadManagement.post("/assignLeadToUser", jwt.verifyJWT, isAdminPresent, assignLeadToUser);

leadManagement.post("/createLeadFromOutSource", createLead); // social media

module.exports = leadManagement;