const express = require('express');
const { loginStudent, verifyLoginOtp, getStudentForStudentById } = require('../Controller/Student/studentController');
const { getCourseContentByCourseIdForStudent } = require('../Controller/Admin/courseContentController');
const { getAllCourse } = require('../Controller/Admin/courseController');
const student = express.Router();

// middleware
const jwt = require('../Middleware/verifyJWTToken');
const { isStudentPresent } = require('../Middleware/isPresent');

student.post("/login", loginStudent);
student.post("/verifyLoginOtp", verifyLoginOtp);
student.get("/student", jwt.verifyStudentJWT, isStudentPresent, getStudentForStudentById);

student.get("/getCourseContent/:courseId", jwt.verifyStudentJWT, isStudentPresent, getCourseContentByCourseIdForStudent);
student.get("/getAllCourse", jwt.verifyStudentJWT, isStudentPresent, getAllCourse);

module.exports = student;