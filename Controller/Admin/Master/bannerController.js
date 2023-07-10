const db = require('../../../Models');
const Banner = db.banner;
const { deleteSingleFile } = require('../../../Util/deleteFile')

exports.addBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload Banner!"
            });
        }
        let code;
        const isBannerCode = await Banner.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isBannerCode.length == 0) {
            code = "BANNER" + 1000;
        } else {
            let lastBannerCode = isBannerCode[isBannerCode.length - 1];
            let lastDigits = lastBannerCode.bannerCode.substring(6);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "BANNER" + incrementedDigits;
        }
        await Banner.create({
            bannerCode: code,
            bannerImage: req.file.path,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Banner uploaded successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllBanner = async (req, res) => {
    try {
        const banner = await Banner.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Banner fetched successfully!",
            data: banner
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findOne({
            where: {
                bannerCode: req.params.bannerCode
            }
        });
        if (!banner) {
            return res.status(400).send({
                success: false,
                message: "Banner is not present!"
            });
        }
        if (banner.bannerImage) {
            deleteSingleFile(banner.bannerImage);
        }
        await banner.destroy();
        res.status(200).send({
            success: true,
            message: "Banner deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}
