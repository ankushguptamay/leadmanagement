const db = require('../../../Models');
const Disease = db.disease;

exports.addDisease = async (req, res) => {
    try {
        const { disease } = req.body;
        if (!disease) {
            return res.status(400).send({
                success: false,
                message: "Disease can't be blank!"
            });
        }
        let code;
        const isDiseaseCode = await Disease.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isDiseaseCode.length == 0) {
            code = "DISEASE" + 1000;
        } else {
            let lastDiseaseCode = isDiseaseCode[isDiseaseCode.length - 1];
            let lastDigits = lastDiseaseCode.diseaseCode.substring(7);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "DISEASE" + incrementedDigits;
        }
        await Disease.create({
            disease: disease,
            diseaseCode: code,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Disease Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllDisease = async (req, res) => {
    try {
        const disease = await Disease.findAll({
            order: [
                ['disease', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Disease fetched successfully!",
            data: disease
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteDisease = async (req, res) => {
    try {
        const disease = await Disease.findOne({
            where: {
                diseaseCode: req.params.diseaseCode
            }
        });
        if (!disease) {
            return res.status(400).send({
                success: false,
                message: "Disease is not present!"
            });
        }
        await disease.destroy();
        res.status(200).send({
            success: true,
            message: "Disease deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}
