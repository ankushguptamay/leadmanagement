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

// Lead
db.leadProfile = require('./Lead/leadProfileModel.js')(sequelize, Sequelize);
db.leadAddress = require('./Lead/leadAddressModel.js')(sequelize, Sequelize);
db.leadContact = require('./Lead/leadContactModel.js')(sequelize, Sequelize);
db.leadOrganisation = require('./Lead/leadOrganisationModel.js')(sequelize, Sequelize);

// User
db.userInformation = require('./User/userInfoModel.js')(sequelize, Sequelize);

// Admin Association
db.adminInformation.hasMany(db.userInformation, { foreignKey: 'adminInformationId' });

// Lead Association
db.leadProfile.hasOne(db.leadAddress, { foreignKey: 'leadProfileId', as: "address" });
db.leadAddress.belongsTo(db.leadProfile, { foreignKey: 'leadProfileId' });

db.leadProfile.hasOne(db.leadContact, { foreignKey: 'leadProfileId', as: "contact" });
db.leadContact.belongsTo(db.leadProfile, { foreignKey: 'leadProfileId' });

db.leadProfile.hasOne(db.leadOrganisation, { foreignKey: 'leadProfileId', as: "organisation" });
db.leadOrganisation.belongsTo(db.leadProfile, { foreignKey: 'leadProfileId' });

db.leadProfile.belongsToMany(db.userInformation, { through: "lead_To_User", as: 'users' });
db.userInformation.belongsToMany(db.leadProfile, { through: "lead_To_User", as: "leads" });

module.exports = db;
