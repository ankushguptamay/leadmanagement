const db = require('../../../Models');
const AppointmentBanner = db.appointmentBanner;
const { deleteSingleFile } = require('../../../Util/deleteFile');

exports.addAppointmentBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload an appointment banner!"
            });
        }
        let code;
        const isBannerCode = await AppointmentBanner.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isBannerCode.length == 0) {
            code = "APMBAN" + 1000;
        } else {
            let lastBannerCode = isBannerCode[isBannerCode.length - 1];
            let lastDigits = lastBannerCode.appointmentBannerCode.substring(6);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "APMBAN" + incrementedDigits;
        }
        await AppointmentBanner.create({
            appointmentBannerCode: code,
            appointmentBanner_Path: req.file.path,
            appointmentBanner_Name: req.file.originalname,
            appointmentBanner_FileName: req.file.filename,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Appointment Banner uploaded successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllAppointmentBanner = async (req, res) => {
    try {
        const banner = await AppointmentBanner.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Appointment Banner fetched successfully!",
            data: banner
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteAppointmentBanner = async (req, res) => {
    try {
        const banner = await AppointmentBanner.findOne({
            where: {
                appointmentBannerCode: req.params.appointmentBannerCode
            }
        });
        if (!banner) {
            return res.status(400).send({
                success: false,
                message: "Appointment Banner is not present!"
            });
        }
        if (banner.appointmentBanner_Path) {
            deleteSingleFile(banner.appointmentBanner_Path);
        }
        await banner.destroy();
        res.status(200).send({
            success: true,
            message: "Appointment Banner deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}
