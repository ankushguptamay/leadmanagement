const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { createLead, getAllLeadByStatus, updateLeadProfile, deleteLead, restoreLead, deletePreviousLead, getLeadByLeadCode,
    countLeadByStatusForAdmin, countNewLeadForAdmin } = require('../Controller/Lead/leadProfileController');
const { registerUser, users, deleteUser, restoreUser, searchUser, deletedUsers } = require('../Controller/Lead/userInformationCont');
const { assignLeadToUser, rollBackAssign } = require('../Controller/Lead/assignLeadController');
const { allEmployeesInformation, registerEmployee, deleteEmployees, deletedEmployeesInformation, searchEmployees, restoreEmployee } = require('../Controller/Employee/employeesController');
const { addCourse, getAllCourse } = require('../Controller/Admin/courseController');
const { addCourseContent, getCourseContentByCourseId } = require('../Controller/Admin/courseContentController');
const { addAppointmentSlote, getAppointmentSloteByDate } = require('../Controller/Admin/appointmentSloteController');
const { bookPatientAppointment } = require('../Controller/Patient/patientAppointment');
const { addCategory, getAllCategory, deleteCategory } = require('../Controller/Admin/Master/categoryController');
const { addLanguage, getAllLanguage, deleteLanguage } = require('../Controller/Admin/Master/languageController');
const { addLevel, getAllLevel, deleteLevel } = require('../Controller/Admin/Master/levelController');
const { addMedium, getAllMedium, deleteMedium } = require('../Controller/Admin/Master/mediumController');
const { addTopic, getAllTopic, deleteTopic } = require('../Controller/Admin/Master/topicController');
const { getAppUserForAdmin } = require('../Controller/AppUser/appUserController');
const { registerStudent, deleteStudent, getDeletedStudent, searchAndGetActiveStudent, restoreStudent, getStudentForAdminById, addSecondCourseToStudent, removeCourseFromStudent } = require('../Controller/Student/studentController');
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
leadManagement.get("/countLeadByStatusDashboard", jwt.verifyJWT, isAdminPresent, countLeadByStatusForAdmin);
leadManagement.get("/countNewLeadDashboard", jwt.verifyJWT, isAdminPresent, countNewLeadForAdmin);

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

leadManagement.post("/addCourseContent/:courseId", jwt.verifyJWT, isAdminPresent, uploadMultiPDF.array('contentNotes', 10), addCourseContent);
leadManagement.get("/courseContent/:courseId", jwt.verifyJWT, isAdminPresent, getCourseContentByCourseId);

leadManagement.post("/addCategory", jwt.verifyJWT, isAdminPresent, uploadImage.single('categoryThumbnail'), addCategory);
leadManagement.get("/categories", jwt.verifyJWT, isAdminPresent, getAllCategory);
leadManagement.delete("/deleteCategory/:categoryCode", jwt.verifyJWT, isAdminPresent, deleteCategory);

leadManagement.post("/addLanguage", jwt.verifyJWT, isAdminPresent, addLanguage);
leadManagement.get("/languages", jwt.verifyJWT, isAdminPresent, getAllLanguage);
leadManagement.delete("/deleteLanguage/:languageCode", jwt.verifyJWT, isAdminPresent, deleteLanguage);

leadManagement.post("/addLevel", jwt.verifyJWT, isAdminPresent, addLevel);
leadManagement.get("/levels", jwt.verifyJWT, isAdminPresent, getAllLevel);
leadManagement.delete("/deleteLevel/:levelCode", jwt.verifyJWT, isAdminPresent, deleteLevel);

leadManagement.post("/addMedium", jwt.verifyJWT, isAdminPresent, addMedium);
leadManagement.get("/mediums", jwt.verifyJWT, isAdminPresent, getAllMedium);
leadManagement.delete("/deleteMedium/:mediumCode", jwt.verifyJWT, isAdminPresent, deleteMedium);

leadManagement.post("/addTopic", jwt.verifyJWT, isAdminPresent, addTopic);
leadManagement.get("/topics", jwt.verifyJWT, isAdminPresent, getAllTopic);
leadManagement.delete("/deleteTopic/:topicCode", jwt.verifyJWT, isAdminPresent, deleteTopic);

leadManagement.post("/registerStudent", jwt.verifyJWT, isAdminPresent, registerStudent);
leadManagement.get("/student", jwt.verifyJWT, isAdminPresent, searchAndGetActiveStudent);
leadManagement.get("/getDeletedStudent", jwt.verifyJWT, isAdminPresent, getDeletedStudent);
leadManagement.delete("/deleteStudent/:id", jwt.verifyJWT, isAdminPresent, deleteStudent); // id= studentId
leadManagement.post("/restoreStudent/:id", jwt.verifyJWT, isAdminPresent, restoreStudent); // id= studentId
leadManagement.get("/getStudent/:id", jwt.verifyJWT, isAdminPresent, getStudentForAdminById); // id= studentId
leadManagement.post("/addSecondCourseToStudent", jwt.verifyJWT, isAdminPresent, addSecondCourseToStudent);
leadManagement.delete("/removeCourseFromStudent/:id", jwt.verifyJWT, isAdminPresent, removeCourseFromStudent); // id= course_studentId

leadManagement.post("/bookPatientAppointment/:sloteId", bookPatientAppointment);// for patient

leadManagement.get("/getAppUserForAdmin", jwt.verifyJWT, isAdminPresent, getAppUserForAdmin);

leadManagement.post("/createLeadFromOutSource", createLead); // social media

module.exports = leadManagement;