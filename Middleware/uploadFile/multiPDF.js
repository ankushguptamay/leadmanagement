const path = require("path");
const multer = require("multer");

const filter = (req, file, cb) => {
 if (file.mimetype.startsWith("application/pdf")) {
        cb(null, true);
    } else {
        cb("Please upload only PDF.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "contentNotes") {
            cb(null, path.join(`${__dirname}/../../Resource/CourseContentPDF`));
        } 
    },
    filename: (req, file, callback) => {
        var filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});
uploadPDF = multer({ storage: storage, fileFilter: filter });

module.exports = uploadPDF;