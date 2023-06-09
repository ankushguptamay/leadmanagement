const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { createLead, getAllLeadByStatus, updateLeadProfile } = require('../Controller/Lead/leadProfileController');
const { registerUser, users } = require('../Controller/User/userInformationCont');
const { assignLeadToUser } = require('../Controller/Lead/assignLeadController');
const { allEmployeesInformation, registerEmployee, deleteEmployees, searchEmployees } = require('../Controller/User/employeesController');
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
leadManagement.put("/updateLeadProfile/:leadCode", jwt.verifyJWT, isAdminPresent, updateLeadProfile);

leadManagement.post("/assignLeadToUser", jwt.verifyJWT, isAdminPresent, assignLeadToUser);

leadManagement.post("/registerEmployee", jwt.verifyJWT, isAdminPresent, registerEmployee);
leadManagement.get("/allEmployeesInformation", jwt.verifyJWT, isAdminPresent, allEmployeesInformation);
leadManagement.delete("/deleteEmployees/:employeesCode", jwt.verifyJWT, isAdminPresent, deleteEmployees);
leadManagement.get("/searchEmployees", jwt.verifyJWT, isAdminPresent, searchEmployees);

leadManagement.post("/createLeadFromOutSource", createLead); // social media

module.exports = leadManagement;