module.exports = (sequelize, DataTypes) => {
    const AppointmentBanner = sequelize.define("appointmentBanners", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        appointmentBanner_Path: {
            type: DataTypes.STRING(1234)
        },
        appointmentBanner_Name: {
            type: DataTypes.STRING(1234)
        },
        appointmentBanner_FileName: {
            type: DataTypes.STRING(1234)
        },
        appointmentBannerCode: {
            type: DataTypes.STRING
        }
    })
    return AppointmentBanner;
}