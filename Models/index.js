const dbConfig = require('../Config/db.Config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Admin
db.adminInformation = require('./Admin/adminInfoModel.js')(sequelize, Sequelize);
db.lead_To_User = require('./Admin/assignLeadToUserModel.js')(sequelize, Sequelize);
db.adminCourseContent = require('./Admin/courseContentModel.js')(sequelize, Sequelize);
db.adminCourse = require('./Admin/courseModel.js')(sequelize, Sequelize);
db.appointmentSlote = require('./Admin/appointmentSloteModel.js')(sequelize, Sequelize);

// Patient
db.patientAppointment = require('./patient/patientAppointmentModel.js')(sequelize, Sequelize);

// Lead
db.leadProfile = require('./Lead/leadProfileModel.js')(sequelize, Sequelize);
db.previousUpdateRecordLead = require('./Lead/previousUpdateRecordLeadModel.js')(sequelize, Sequelize);

// User
db.userInformation = require('./User/userInfoModel.js')(sequelize, Sequelize);
db.employeesInformation = require('./User/epmloyeesInfoModel.js')(sequelize, Sequelize);
db.previousUpdateRecordEmployees = require('./User/previousUpdateRecordEmployeesModel.js')(sequelize, Sequelize);
db.previousUpdateRecordUser = require('./User/previousUpdateRecordUserModel.js')(sequelize, Sequelize);

// Association
db.adminInformation.hasMany(db.userInformation, { foreignKey: 'createrCode' });
db.adminInformation.hasMany(db.employeesInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.adminCourse, { foreignKey: 'createrCode' });
db.adminCourse.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.adminCourseContent, { foreignKey: 'createrCode' });

db.adminCourse.hasMany(db.adminCourseContent, { foreignKey: 'courseId', as: 'courseContent' });
db.adminCourseContent.belongsTo(db.adminCourse, { foreignKey: 'courseId', as: 'parentCourse' });

db.adminInformation.hasMany(db.appointmentSlote, { foreignKey: 'createrCode' });
db.appointmentSlote.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.leadProfile.belongsToMany(db.userInformation, { through: "lead_To_User", as: 'users' });
db.userInformation.belongsToMany(db.leadProfile, { through: "lead_To_User", as: "leads" });

db.leadProfile.hasMany(db.previousUpdateRecordLead, { foreignKey: 'leadProfileCode' });
db.previousUpdateRecordLead.belongsTo(db.leadProfile, { foreignKey: 'leadProfileCode' });

db.userInformation.hasMany(db.previousUpdateRecordUser, { foreignKey: 'userInformationCode' });
db.previousUpdateRecordUser.belongsTo(db.userInformation, { foreignKey: 'userInformationCode' });

db.employeesInformation.hasMany(db.previousUpdateRecordEmployees, { foreignKey: 'employeesInformationCode' });
db.previousUpdateRecordEmployees.belongsTo(db.employeesInformation, { foreignKey: 'employeesInformationCode' });

db.appointmentSlote.hasMany(db.patientAppointment, { foreignKey: 'appointmentSloteId', as: 'patientDetail' });
db.patientAppointment.belongsTo(db.appointmentSlote, { foreignKey: 'appointmentSloteId', as: 'bookingSlote' });

// This many to many relation auto deleteing table after create it.......?
// db.leadProfile.belongsToMany(
//     db.userInformation, {
//     through: "lead_To_User",
//     foreignKey: "leadProfileCode",
//     otherKey: "userInformationCode",
//     targetKey: "userCode",
//     sourceKey: "leadCode",
//     as: 'users'
// }
// );
// db.userInformation.belongsToMany(
//     db.leadProfile, {
//     through: "lead_To_User",
//     foreignKey: "userInformationCode",
//     otherKey: 'leadProfileCode',
//     targetKey: "leadCode",
//     sourceKey: "userCode",
//     as: "leads"
// }
// );

module.exports = db;
