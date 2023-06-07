const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { createLead, getAllLeadByStatus } = require('../Controller/Lead/leadProfileController');
const { registerUser } = require('../Controller/User/userInformationCont');
const { createLeadOrganisation, updateLeadOrganisation } = require('../Controller/Lead/leadOrganisationCont');
const { createLeadContact, updateLeadContact } = require('../Controller/Lead/leadContactController');
const { createLeadAddress, updateLeadAddress } = require('../Controller/Lead/leadAddressController');
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

leadManagement.post("/createLead", jwt.verifyJWT, isAdminPresent, createLead);
leadManagement.get("/leadByStatus", jwt.verifyJWT, isAdminPresent, getAllLeadByStatus);

leadManagement.post("/createLeadAddress", jwt.verifyJWT, isAdminPresent, createLeadAddress);
leadManagement.put("/updateLeadAddress/:id", jwt.verifyJWT, isAdminPresent, updateLeadAddress);

leadManagement.post("/createLeadContact", jwt.verifyJWT, isAdminPresent, createLeadContact);
leadManagement.put("/updateLeadContact/:id", jwt.verifyJWT, isAdminPresent, updateLeadContact);

leadManagement.post("/createLeadOrganisation", jwt.verifyJWT, isAdminPresent, createLeadOrganisation);
leadManagement.put("/updateLeadOrganisation/:id", jwt.verifyJWT, isAdminPresent, updateLeadOrganisation);

leadManagement.post("/assignLeadToUser", jwt.verifyJWT, isAdminPresent, assignLeadToUser);

module.exports = leadManagement;