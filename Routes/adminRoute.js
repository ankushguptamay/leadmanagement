const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { createLead, getAllLeadByStatus, updateLeadProfile, deleteLead, restoreLead, deletePreviousLead, getLeadByLeadCode } = require('../Controller/Lead/leadProfileController');
const { registerUser, users, deleteUser, restoreUser, searchUser, deletedUsers } = require('../Controller/User/userInformationCont');
const { assignLeadToUser, rollBackAssign } = require('../Controller/Lead/assignLeadController');
const { allEmployeesInformation, registerEmployee, deleteEmployees, deletedEmployeesInformation, searchEmployees, restoreEmployee } = require('../Controller/User/employeesController');
const { addCourse, getAllCourse } = require('../Controller/Admin/courseController');
const { addCourseContent, getCourseContentByCourseId } = require('../Controller/Admin/courseContentController');
const { addAppointmentSlote, getAppointmentSloteByDate, bookedSlote } = require('../Controller/Admin/appointmentSloteController');
const { bookPatientAppointment } = require('../Controller/Patient/patientAppointment');
const leadManagement = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isAdminPresent } = require('../Middleware/isPresent');
const uploadImage = require('../Middleware/uploadFile/singleImage');
const uploadMultiPDF = require('../Middleware/uploadFile/multiPDF');

// leadManagement.post("/register", registerAdmin);
leadManagement.post("/login", loginAdmin);
leadManagement.get("/information", jwt.verifyJWT, getAdmin);
leadManagement.put("/updateInformation", jwt.verifyJWT, updateAdminName);

leadManagement.post("/registerUser", jwt.verifyJWT, isAdminPresent, registerUser);
leadManagement.get("/users", jwt.verifyJWT, isAdminPresent, users);
leadManagement.get("/deletedUsers", jwt.verifyJWT, isAdminPresent, deletedUsers);
leadManagement.delete("/deleteUser/:userCode", jwt.verifyJWT, isAdminPresent, deleteUser);
leadManagement.post("/restoreUser/:userCode", jwt.verifyJWT, isAdminPresent, restoreUser);
leadManagement.get("/searchUser", jwt.verifyJWT, isAdminPresent, searchUser);

leadManagement.post("/createLead", jwt.verifyJWT, isAdminPresent, createLead);
leadManagement.get("/leadByStatus", jwt.verifyJWT, isAdminPresent, getAllLeadByStatus);
leadManagement.get("/getLeadByLeadCode/:leadCode", jwt.verifyJWT, isAdminPresent, getLeadByLeadCode);
leadManagement.put("/updateLeadProfile/:leadCode", jwt.verifyJWT, isAdminPresent, updateLeadProfile);
leadManagement.post("/restoreLead/:leadCode", jwt.verifyJWT, isAdminPresent, restoreLead);
leadManagement.delete("/deleteLead/:leadCode", jwt.verifyJWT, isAdminPresent, deleteLead);
leadManagement.delete("/deletePreviousLead/:leadProfileCode", jwt.verifyJWT, isAdminPresent, deletePreviousLead);

leadManagement.post("/assignLeadToUser", jwt.verifyJWT, isAdminPresent, assignLeadToUser);
leadManagement.post("/rollBackAssign", jwt.verifyJWT, isAdminPresent, rollBackAssign);

leadManagement.post("/registerEmployee", jwt.verifyJWT, isAdminPresent, registerEmployee);
leadManagement.get("/searchEmployees", jwt.verifyJWT, isAdminPresent, searchEmployees);
leadManagement.get("/allEmployeesInformation", jwt.verifyJWT, isAdminPresent, allEmployeesInformation);
leadManagement.get("/deletedEmployeesInformation", jwt.verifyJWT, isAdminPresent, deletedEmployeesInformation);
leadManagement.delete("/deleteEmployees/:employeesCode", jwt.verifyJWT, isAdminPresent, deleteEmployees);
leadManagement.post("/restoreEmployee/:employeesCode", jwt.verifyJWT, isAdminPresent, restoreEmployee);

leadManagement.post("/addCourse", jwt.verifyJWT, isAdminPresent, uploadImage.single('courseImage'), addCourse);
leadManagement.get("/allCourse", jwt.verifyJWT, isAdminPresent, getAllCourse);

leadManagement.post("/addAppointmentSlote", jwt.verifyJWT, isAdminPresent, addAppointmentSlote);
leadManagement.get("/getAppointmentSloteByDate", jwt.verifyJWT, isAdminPresent, getAppointmentSloteByDate);
leadManagement.get("/bookedSlote", jwt.verifyJWT, isAdminPresent, bookedSlote);// as notification

leadManagement.post("/addCourseContent/:courseId", jwt.verifyJWT, isAdminPresent, uploadMultiPDF.array('contentNotes', 10), addCourseContent);
leadManagement.get("/courseContent/:courseId", jwt.verifyJWT, isAdminPresent, getCourseContentByCourseId);

leadManagement.post("/bookPatientAppointment/:sloteId", bookPatientAppointment);// for patient

leadManagement.post("/createLeadFromOutSource", createLead); // social media

module.exports = leadManagement;