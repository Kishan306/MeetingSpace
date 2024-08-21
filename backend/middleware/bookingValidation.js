const Joi = require("joi");

const dateValidation = (value, helpers) => {
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    return helpers.error("any.invalid");
  }
  return value;
};

const bookingSchema = Joi.object({
  roomId: Joi.number().integer().required(),
  roomNumber: Joi.number().integer().required(),
  bookedBy: Joi.number().integer().required(),
  bookingFor: Joi.string().max(50).required(),
  bookingDescription: Joi.string().optional().allow(""),
  bookingFrom: Joi.date().custom(dateValidation).required(),
  bookingTill: Joi.date().custom(dateValidation).required(),
});

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body, { convert: true });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  next();
};

module.exports = { validateBooking };
