const dbConfig = require('../Config/db.Config.js');

const { Sequelize, DataTypes } = require('sequelize');
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
const queryInterface = sequelize.getQueryInterface();
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Admin
db.adminInformation = require('./Admin/adminInfoModel.js')(sequelize, Sequelize);
db.lead_To_User = require('./Admin/assignLeadToUserModel.js')(sequelize, Sequelize);
db.adminCourseContent = require('./Admin/courseContentModel.js')(sequelize, Sequelize);
db.adminCourse = require('./Admin/courseModel.js')(sequelize, Sequelize);
db.appointmentSlote = require('./Admin/appointmentSloteModel.js')(sequelize, Sequelize);
db.category = require('./Admin/Master/categorymodel.js')(sequelize, Sequelize);
db.language = require('./Admin/Master/languageModel.js')(sequelize, Sequelize);
db.level = require('./Admin/Master/levelModel.js')(sequelize, Sequelize);
db.medium = require('./Admin/Master/mediumModel.js')(sequelize, Sequelize);
db.topic = require('./Admin/Master/topicModel.js')(sequelize, Sequelize);
db.banner = require('./Admin/Master/bannerModel.js')(sequelize, Sequelize);
db.disease = require('./Admin/Master/diseaseModel.js')(sequelize, Sequelize);
db.appointmentBanner = require('./Admin/Master/appointmentBannerModel.js')(sequelize, Sequelize);
db.contentNotes = require('./Admin/courseContentNotesModel.js')(sequelize, Sequelize);

// Lead
db.leadProfile = require('./Lead/leadProfileModel.js')(sequelize, Sequelize);
db.previousUpdateRecordLead = require('./Lead/previousUpdateRecordLeadModel.js')(sequelize, Sequelize);
db.previousUpdateRecordEmployees = require('./Employee/previousUpdateRecordEmployeesModel.js')(sequelize, Sequelize);
db.previousUpdateRecordUser = require('./Lead/previousUpdateRecordUserModel.js')(sequelize, Sequelize);

// Employee
db.userInformation = require('./Lead/userInfoModel.js')(sequelize, Sequelize);
db.employeesInformation = require('./Employee/epmloyeesInfoModel.js')(sequelize, Sequelize);

// AppUser
db.appUser = require('./AppUser/appUserModel.js')(sequelize, Sequelize);
db.appUser_Course = require('./AppUser/appUser_CourseModel.js')(sequelize, Sequelize);

// Association
db.adminInformation.hasMany(db.userInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.employeesInformation, { foreignKey: 'createrCode' });

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

// association bt admin and master
db.adminInformation.hasMany(db.category, { foreignKey: 'createrCode' });
db.category.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.language, { foreignKey: 'createrCode' });
db.language.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.medium, { foreignKey: 'createrCode' });
db.medium.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.level, { foreignKey: 'createrCode' });
db.level.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.topic, { foreignKey: 'createrCode' });
db.topic.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.banner, { foreignKey: 'createrCode' });
db.banner.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.disease, { foreignKey: 'createrCode' });
db.disease.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.appointmentBanner, { foreignKey: 'createrCode' });
db.appointmentBanner.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

// Association bt Course and AppUser
db.appUser.hasMany(db.appUser_Course, { foreignKey: 'appUserId', as: 'appUser_Course' });
db.appUser_Course.belongsTo(db.appUser, { foreignKey: 'appUserId', as: "student" });

db.adminCourse.hasMany(db.appUser_Course, { foreignKey: 'courseId', as: 'appUser_Course' });
db.appUser_Course.belongsTo(db.adminCourse, { foreignKey: 'courseId', as: "course" });

// Association bt Course, Content And Notes
db.adminInformation.hasMany(db.adminCourse, { foreignKey: 'createrCode' });
db.adminCourse.belongsTo(db.adminInformation, { foreignKey: 'createrCode' });

db.adminInformation.hasMany(db.adminCourseContent, { foreignKey: 'createrCode' });

db.adminCourse.hasMany(db.adminCourseContent, { foreignKey: 'courseId', as: 'courseContent', onDelete: 'cascade' });
db.adminCourseContent.belongsTo(db.adminCourse, { foreignKey: 'courseId', as: 'parentCourse' });

db.adminCourse.hasMany(db.contentNotes, { foreignKey: 'courseId', as: 'contentNotes', onDelete: 'cascade' });
db.contentNotes.belongsTo(db.adminCourse, { foreignKey: 'courseId', as: 'parentCourse' });

db.adminCourseContent.hasMany(db.contentNotes, { foreignKey: 'contentId', as: 'contentNotes', onDelete: 'cascade' });
db.contentNotes.belongsTo(db.adminCourseContent, { foreignKey: 'contentId', as: 'parentContent' });

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

// queryInterface.addColumn('appUsers', "profileImage_Path", { type: DataTypes.STRING(1234) });
// queryInterface.addColumn('appUsers', "profileImage_Name", { type: DataTypes.STRING(1234) });
// queryInterface.addColumn('appUsers', "profileImage_FileName", { type: DataTypes.STRING(1234) });

// queryInterface.removeColumn('adminCourseContents', "subject");

module.exports = db;
