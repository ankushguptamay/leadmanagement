const joi = require('joi');
const pattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";

exports.adminRegistration = (data) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required().label('Email'),
        phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: joi.string()
            // .regex(RegExp(pattern))
            .required()
            .min(8)
            .max(8)
    }) // .options({ allowUnknown: true });
    return schema.validate(data);
}

exports.adminLogin = (data) => {
    const schema = joi.object().keys({
        email: joi.string().email().required().label('Email'),
        password: joi.string()
            // .regex(RegExp(pattern))
            .required()
            .min(8)
            .max(8)
    })//.options({ allowUnknown: true });
    return schema.validate(data);
}

exports.userRegistration = (data) => {
    const schema = joi.object().keys({
        // name: joi.string().min(3).max(30).required(),
        // email: joi.string().email().required().label('Email'),
        // phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        employeesCode: joi.string().required(),
    });
    return schema.validate(data);
}

exports.userLogin = (data) => {
    const schema = joi.object().keys({
        phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required()
    })//.options({ allowUnknown: true });
    return schema.validate(data);
}

exports.userLoginOTP = (data) => {
    const schema = joi.object().keys({
        phoneOTP: joi.string().length(6).required(),
        phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required()
    })//.options({ allowUnknown: true });
    return schema.validate(data);
}

exports.createLeadValidation = (data) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(30).required(),
        // email: joi.string().email().required().label('Email'),
        phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        source: joi.string().required()
    }).options({ allowUnknown: true });
    return schema.validate(data);
}

exports.employeeRegistration = (data) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required().label('Email'),
        phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        address: joi.string().min(3).max(100).required(),
        profile_position: joi.string().min(3).max(20).required()
    });
    return schema.validate(data);
}

exports.assignLeadToUser = (data) => {
    const schema = joi.object().keys({
        leadProfileCode: joi.array().required(),
        userInformationCode: joi.string().required(),
    });
    return schema.validate(data);
}

exports.rollBackAssign = (data) => {
    const schema = joi.object().keys({
        leadProfileCode: joi.string().required(),
        userInformationCode: joi.string().required(),
    });
    return schema.validate(data);
}