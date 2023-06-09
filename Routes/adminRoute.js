const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { createLead, getAllLeadByStatus, updateLeadProfile, deleteLead, restoreLead } = require('../Controller/Lead/leadProfileController');
const { registerUser, users, deleteUser, restoreUser } = require('../Controller/User/userInformationCont');
const { assignLeadToUser, rollBackAssign } = require('../Controller/Lead/assignLeadController');
const { allEmployeesInformation, registerEmployee, deleteEmployees, searchEmployees, restoreEmployee } = require('../Controller/User/employeesController');
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
leadManagement.delete("/deleteUser/:userCode", jwt.verifyJWT, isAdminPresent, deleteUser);
leadManagement.post("/restoreUser/:userCode", jwt.verifyJWT, isAdminPresent, restoreUser);

leadManagement.post("/createLead", jwt.verifyJWT, isAdminPresent, createLead);
leadManagement.get("/leadByStatus", jwt.verifyJWT, isAdminPresent, getAllLeadByStatus);
leadManagement.put("/updateLeadProfile/:leadCode", jwt.verifyJWT, isAdminPresent, updateLeadProfile);
leadManagement.post("/restoreLead/:leadCode", jwt.verifyJWT, isAdminPresent, restoreLead);
leadManagement.delete("/deleteLead/:leadCode", jwt.verifyJWT, isAdminPresent, deleteLead);

leadManagement.post("/assignLeadToUser", jwt.verifyJWT, isAdminPresent, assignLeadToUser);
leadManagement.post("/rollBackAssign", jwt.verifyJWT, isAdminPresent, rollBackAssign);

leadManagement.post("/registerEmployee", jwt.verifyJWT, isAdminPresent, registerEmployee);
leadManagement.get("/allEmployeesInformation", jwt.verifyJWT, isAdminPresent, allEmployeesInformation);
leadManagement.delete("/deleteEmployees/:employeesCode", jwt.verifyJWT, isAdminPresent, deleteEmployees);
leadManagement.post("/restoreEmployee/:employeesCode", jwt.verifyJWT, isAdminPresent, restoreEmployee);

leadManagement.get("/searchEmployees", jwt.verifyJWT, isAdminPresent, searchEmployees);

leadManagement.post("/createLeadFromOutSource", createLead); // social media

module.exports = leadManagement;