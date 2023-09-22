module.exports = (sequelize, DataTypes) => {
    const ContentNote = sequelize.define("contentNotes", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        note_Path: {
            type: DataTypes.STRING(1234)
        },
        note_Name: {
            type: DataTypes.STRING
        },
        note_FileName: {
            type: DataTypes.STRING(1234)
        },
        note_MimeType: {
            type: DataTypes.STRING
        }
    })
    return ContentNote;
}

// foriefn key
// courseId
// contentId