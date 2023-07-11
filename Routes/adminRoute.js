const express = require('express');
const { registerAdmin, loginAdmin, getAdmin, updateAdminName } = require('../Controller/Admin/authController');
const { createLead, getAllLeadByStatus, updateLeadProfile, deleteLead, restoreLead, deletePreviousLead, getLeadByLeadCode,
    countLeadByStatusForAdmin, countNewLeadForAdmin , countLeadAssignToUser} = require('../Controller/Lead/leadProfileController');
const { registerUser, users, deleteUser, restoreUser, searchUser, deletedUsers } = require('../Controller/Lead/userInformationCont');
const { assignLeadToUser, rollBackAssign } = require('../Controller/Lead/assignLeadController');
const { allEmployeesInformation, registerEmployee, deleteEmployees, deletedEmployeesInformation, searchEmployees, restoreEmployee } = require('../Controller/Employee/employeesController');
const { addCourse, getAllCourse, updateCourse, updateCourseImage, updateTeacherImage, deleteCourse } = require('../Controller/Admin/courseController');
const { addCourseContent, getCourseContentByCourseId, updateCourseContent, deleteCourseContent } = require('../Controller/Admin/courseContentController');
const { addAppointmentSlote, getAppointmentSloteByDate, bookedSlote, bookedSloteByDate, availableSlote } = require('../Controller/Admin/appointmentSloteController');
const { addCategory, getAllCategory, deleteCategory } = require('../Controller/Admin/Master/categoryController');
const { addLanguage, getAllLanguage, deleteLanguage } = require('../Controller/Admin/Master/languageController');
const { addLevel, getAllLevel, deleteLevel } = require('../Controller/Admin/Master/levelController');
const { addMedium, getAllMedium, deleteMedium } = require('../Controller/Admin/Master/mediumController');
const { addBanner, getAllBanner, deleteBanner } = require('../Controller/Admin/Master/bannerController');
const { addDisease, getAllDisease, deleteDisease } = require('../Controller/Admin/Master/diseaseController');
const { addTopic, getAllTopic, deleteTopic } = require('../Controller/Admin/Master/topicController');
const { getAppUserForAdmin } = require('../Controller/AppUser/appUserController');
const { registerStudent, deleteStudent, getDeletedStudent, searchAndGetActiveStudent, restoreStudent,
    getStudentForAdminById, addSecondCourseToStudent, removeCourseFromStudent } = require('../Controller/Student/studentController');
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
leadManagement.get("/countLeadAssignToUser/:userCode", jwt.verifyJWT, isAdminPresent, countLeadAssignToUser);

leadManagement.post("/assignLeadToUser", jwt.verifyJWT, isAdminPresent, assignLeadToUser);
leadManagement.post("/rollBackAssign", jwt.verifyJWT, isAdminPresent, rollBackAssign);

leadManagement.post("/registerEmployee", jwt.verifyJWT, isAdminPresent, registerEmployee);
leadManagement.get("/searchEmployees", jwt.verifyJWT, isAdminPresent, searchEmployees);
leadManagement.get("/allEmployeesInformation", jwt.verifyJWT, isAdminPresent, allEmployeesInformation);
leadManagement.get("/deletedEmployeesInformation", jwt.verifyJWT, isAdminPresent, deletedEmployeesInformation);
leadManagement.delete("/deleteEmployees/:employeesCode", jwt.verifyJWT, isAdminPresent, deleteEmployees);
leadManagement.post("/restoreEmployee/:employeesCode", jwt.verifyJWT, isAdminPresent, restoreEmployee);

leadManagement.post("/addCourse", jwt.verifyJWT, isAdminPresent, uploadImage.fields([{ name: 'courseImage', maxCount: 1 }, { name: 'teacherImage', maxCount: 1 }]), addCourse);
leadManagement.get("/allCourse", jwt.verifyJWT, isAdminPresent, getAllCourse);
leadManagement.put("/updateCourseImage/:id", jwt.verifyJWT, isAdminPresent, uploadImage.single('courseImage'), updateCourseImage);
leadManagement.put("/updateTeacherImage/:id", jwt.verifyJWT, isAdminPresent, uploadImage.single('teacherImage'), updateTeacherImage);
leadManagement.put("/updateCourse/:id", jwt.verifyJWT, isAdminPresent, updateCourse);
leadManagement.delete("/deleteCourse/:id", jwt.verifyJWT, isAdminPresent, deleteCourse);

leadManagement.post("/addAppointmentSlote", jwt.verifyJWT, isAdminPresent, addAppointmentSlote);
leadManagement.get("/getAppointmentSloteByDate", jwt.verifyJWT, isAdminPresent, getAppointmentSloteByDate);
leadManagement.get("/bookedSlote", jwt.verifyJWT, isAdminPresent, bookedSlote); // work as notification
leadManagement.get("/bookedSloteByDate", jwt.verifyJWT, isAdminPresent, bookedSloteByDate);
leadManagement.get("/availableSlote", jwt.verifyJWT, isAdminPresent, availableSlote);

leadManagement.post("/addCourseContent", jwt.verifyJWT, isAdminPresent, addCourseContent);
leadManagement.get("/courseContent/:courseId", jwt.verifyJWT, isAdminPresent, getCourseContentByCourseId);
leadManagement.put("/updateContent/:id", jwt.verifyJWT, isAdminPresent, updateCourseContent);
leadManagement.delete("/deleteContent/:id", jwt.verifyJWT, isAdminPresent, deleteCourseContent);

leadManagement.post("/addCategory", jwt.verifyJWT, isAdminPresent, uploadImage.single('categoryThumbnail'), addCategory);
leadManagement.get("/categories", jwt.verifyJWT, isAdminPresent, getAllCategory);
leadManagement.delete("/deleteCategory/:categoryCode", jwt.verifyJWT, isAdminPresent, deleteCategory);

leadManagement.post("/addLanguage", jwt.verifyJWT, isAdminPresent, addLanguage);
leadManagement.get("/languages", jwt.verifyJWT, isAdminPresent, getAllLanguage);
leadManagement.delete("/deleteLanguage/:languageCode", jwt.verifyJWT, isAdminPresent, deleteLanguage);

leadManagement.post("/addBanner", jwt.verifyJWT, isAdminPresent, uploadImage.single('bannerImage'), addBanner);
leadManagement.get("/banners", jwt.verifyJWT, isAdminPresent, getAllBanner);
leadManagement.delete("/deleteBanner/:bannerCode", jwt.verifyJWT, isAdminPresent, deleteBanner);

leadManagement.post("/addDisease", jwt.verifyJWT, isAdminPresent, addDisease);
leadManagement.get("/diseases", jwt.verifyJWT, isAdminPresent, getAllDisease);
leadManagement.delete("/deleteDisease/:diseaseCode", jwt.verifyJWT, isAdminPresent, deleteDisease);


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

leadManagement.get("/getAppUserForAdmin", jwt.verifyJWT, isAdminPresent, getAppUserForAdmin);

leadManagement.post("/createLeadFromOutSource", createLead); // social media

module.exports = leadManagement;