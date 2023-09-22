const db = require('../../Models');
const ContentNote = db.contentNotes;
const AppUser_Course = db.appUser_Course;
const { deleteSingleFile } = require('../../Util/deleteFile');

exports.addContentNotes = async (req, res) => {
    try {
        if (req.files.length < 1) {
            return res.status(400).send({
                success: false,
                message: "Please..Upload atleast one notes!"
            });
        }
        const { contentId, courseId } = req.body;
        const file = req.files;
        for (let i = 0; i < file.length; i++) {
            await ContentNote.create({
                note_MimeType: file[i].mimetype,
                note_Path: file[i].path,
                note_Name: file[i].originalname,
                note_FileName: file[i].filename,
                courseId: courseId,
                contentId: contentId
            });
        }
        res.status(200).send({
            success: true,
            message: "Notes uploaded successfully!"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await ContentNote.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!note) {
            return res.status(400).send({
                success: false,
                message: "Note is not present!"
            });
        }
        if (note.note_Path) {
            deleteSingleFile(note.note_Path);
        }
        await note.destroy();
        res.status(200).send({
            success: true,
            message: "Note deleted successfully!"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for admin
exports.getNoteByContent = async (req, res) => {
    try {
        const notes = await ContentNote.findAll({
            where: {
                contentId: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Notes fetched successfully!",
            data: notes
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// for appUser
exports.getNoteByContentForAppUser = async (req, res) => {
    try {
        const notes = await ContentNote.findAll({
            where: {
                contentId: req.params.id
            }
        });
        if (notes.length <= 0) {
            return res.status(400).send({
                success: true,
                message: "Content notes are not present!"
            });
        }
        const courseId = notes[0].courseId;
        const appUserId = req.appUser.id;
        const isCourse = await AppUser_Course.findOne({
            where: {
                courseId: courseId,
                appUserId: appUserId
            }
        });
        if (!isCourse) {
            res.status(400).send({
                success: false,
                message: "You can't access this notes! Please purchase this!"
            });
        } else {
            res.status(200).send({
                success: true,
                message: "Content notes fetched successfully!",
                data: notes
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}