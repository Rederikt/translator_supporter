//VALIDATION

const Joi = require("@hapi/joi")

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    secondName: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  })
  return schema.validate(data)
}

const orderValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    firstLang: Joi.string().required(),
    secondLang: Joi.string().required(),
    comment: Joi.string(),
    fileName: Joi.string().required(),
    finishDate: Joi.string(),
    fileContent: Joi.object(),
    orderPrice: Joi.string(),
  })
  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.orderValidation = orderValidation
module.exports.loginValidation = loginValidation
