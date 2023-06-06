const express = require('express');
const { getLeadRequestType } = require('../Controller/Admin/leadRequestTypeController');
const { getLeadStatus } = require('../Controller/Admin/leadStatusController');
const { getLeadType } = require('../Controller/Admin/leadTypeController');
const { getUserPosition } = require('../Controller/Admin/positionController');
const { getUserRole } = require('../Controller/Admin/roleController');
const { login, verifyLoginOtp, userInformation } = require('../Controller/User/userInformationCont');
const { createLead, getAllLeadForUser } = require('../Controller/Lead/leadProfileController');
const { createLeadOrganisation, updateLeadOrganisation } = require('../Controller/Lead/leadOrganisationCont');
const { createLeadContact, updateLeadContact } = require('../Controller/Lead/leadContactController');
const { createLeadAddress, updateLeadAddress } = require('../Controller/Lead/leadAddressController');
const leadManagement = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isUserPresentAll } = require('../Middleware/isPresent');

leadManagement.post("/login", login);
leadManagement.post("/verifyLoginOtp", verifyLoginOtp);
leadManagement.get("/userInformation", jwt.verifyJWT, isUserPresentAll, userInformation);

// leadManagement.get("/leadRequestType", jwt.verifyJWT, isUserPresentAll, getLeadRequestType);
// leadManagement.get("/leadStatus", jwt.verifyJWT, isUserPresentAll, getLeadStatus);
// leadManagement.get("/leadType", jwt.verifyJWT, isUserPresentAll, getLeadType);
// leadManagement.get("/userPosition", jwt.verifyJWT, isUserPresentAll, getUserPosition);
// leadManagement.get("/userRole", jwt.verifyJWT, isUserPresentAll, getUserRole);

leadManagement.post("/createLead", jwt.verifyJWT, isUserPresentAll, createLead);
leadManagement.get("/leadForUser", jwt.verifyJWT, isUserPresentAll, getAllLeadForUser);

leadManagement.post("/createLeadAddress", jwt.verifyJWT, isUserPresentAll, createLeadAddress);
leadManagement.put("/updateLeadAddress/:id", jwt.verifyJWT, isUserPresentAll, updateLeadAddress);

leadManagement.post("/createLeadContact", jwt.verifyJWT, isUserPresentAll, createLeadContact);
leadManagement.put("/updateLeadContact/:id", jwt.verifyJWT, isUserPresentAll, updateLeadContact);

leadManagement.post("/createLeadOrganisation", jwt.verifyJWT, isUserPresentAll, createLeadOrganisation);
leadManagement.put("/updateLeadOrganisation/:id", jwt.verifyJWT, isUserPresentAll, updateLeadOrganisation);

module.exports = leadManagement;