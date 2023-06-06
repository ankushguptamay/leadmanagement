const joi = require('joi');

exports.userRegistration = (data) => {
    const schema = joi.object().keys({
        firstName: joi.string().min(3).max(30).required(),
        lastName: joi.string().min(3).max(30).required(),
        email: joi.string().email().required().label('Email'),
        phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        role: joi.array().required(),
        position: joi.string().required(),
    }).options({ allowUnknown: true });
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
