const db = require('../../../Models');
const { Op } = require("sequelize");
const Topic = db.topic;

exports.addTopic = async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).send({
                success: false,
                message: "Topic can't be blank!"
            });
        }
        let code;
        const isTopicCode = await Topic.findAll({
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (isTopicCode.length == 0) {
            code = "TOPIC" + 1000;
        } else {
            let lastTopicCode = isTopicCode[isTopicCode.length - 1];
            let lastDigits = lastTopicCode.topicCode.substring(5);
            let incrementedDigits = parseInt(lastDigits, 10) + 1;
            code = "TOPIC" + incrementedDigits;
            //  console.log(code);
        }
        await Topic.create({
            topic: topic,
            topicCode: code,
            createrCode: req.user.code
        });
        res.status(200).send({
            success: true,
            message: "Topic Created successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.getAllTopic = async (req, res) => {
    try {
        const topic = await Topic.findAll({
            order: [
                ['topic', 'ASC']
            ]
        });
        res.status(200).send({
            success: true,
            message: "Topic fetched successfully!",
            data: topic
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findOne({
            where: {
                topicCode: req.params.topicCode
            }
        });
        if (!topic) {
            return res.status(400).send({
                success: false,
                message: "Topic is not present!"
            });
        }
        await topic.destroy();
        res.status(200).send({
            success: true,
            message: "Topic deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}