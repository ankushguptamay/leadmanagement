const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { addLeadRequestType, getLeadRequestType, updateLeadRequestType, deleteLeadRequestType } = require('../Controller/Admin/leadRequestTypeController');
const { addLeadStatus, getLeadStatus, updateLeadStatus, deleteLeadStatus } = require('../Controller/Admin/leadStatusController');
const { addLeadType, getLeadType, updateLeadType, deleteLeadType } = require('../Controller/Admin/leadTypeController');
const { addUserPosition, getUserPosition, updateUserPosition, deleteUserPosition } = require('../Controller/Admin/positionController');
const { addUserRole, getUserRole, updateUserRole, deleteUserRole } = require('../Controller/Admin/roleController');
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

// leadManagement.post("/addLeadRequestType", jwt.verifyJWT, isAdminPresent, addLeadRequestType);
// leadManagement.get("/leadRequestType", jwt.verifyJWT, isAdminPresent, getLeadRequestType);
// leadManagement.put("/updateLeadRequestType/:id", jwt.verifyJWT, isAdminPresent, updateLeadRequestType);
// leadManagement.delete("/deleteLeadRequestType/:id", jwt.verifyJWT, isAdminPresent, deleteLeadRequestType);

// leadManagement.post("/addLeadStatus", jwt.verifyJWT, isAdminPresent, addLeadStatus);
// leadManagement.get("/leadStatus", jwt.verifyJWT, isAdminPresent, getLeadStatus);
// leadManagement.put("/updateLeadStatus/:id", jwt.verifyJWT, isAdminPresent, updateLeadStatus);
// leadManagement.delete("/deleteLeadStatus/:id", jwt.verifyJWT, isAdminPresent, deleteLeadStatus);

// leadManagement.post("/addLeadType", jwt.verifyJWT, isAdminPresent, addLeadType);
// leadManagement.get("/leadType", jwt.verifyJWT, isAdminPresent, getLeadType);
// leadManagement.put("/updateLeadType/:id", jwt.verifyJWT, isAdminPresent, updateLeadType);
// leadManagement.delete("/deleteLeadType/:id", jwt.verifyJWT, isAdminPresent, deleteLeadType);

// leadManagement.post("/addUserPosition", jwt.verifyJWT, isAdminPresent, addUserPosition);
// leadManagement.get("/userPosition", jwt.verifyJWT, isAdminPresent, getUserPosition);
// leadManagement.put("/updateUserPosition/:id", jwt.verifyJWT, isAdminPresent, updateUserPosition);
// leadManagement.delete("/deleteUserPosition/:id", jwt.verifyJWT, isAdminPresent, deleteUserPosition);

// leadManagement.post("/addUserRole", jwt.verifyJWT, isAdminPresent, addUserRole);
// leadManagement.get("/userRole", jwt.verifyJWT, isAdminPresent, getUserRole);
// leadManagement.put("/updateUserRole/:id", jwt.verifyJWT, isAdminPresent, updateUserRole);
// leadManagement.delete("/deleteUserRole/:id", jwt.verifyJWT, isAdminPresent, deleteUserRole);

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