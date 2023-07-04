module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define("topic", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        topic: {
            type: DataTypes.STRING
        },
        topicCode: {
            type: DataTypes.STRING
        }
    })
    return Topic;
}