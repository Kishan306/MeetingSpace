const Joi = require("joi");

const roomSchema = Joi.object({
  roomNumber: Joi.number().integer().required(),
  capacity: Joi.number().integer().min(1).required(),
  screeningAvailable: Joi.boolean().required(),
  availableFrom: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(), // Time format HH:MM
  availableTill: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(), // Time format HH:MM
});

const updateRoomSchema = Joi.object({
  roomNumber: Joi.number().integer().optional(),
  capacity: Joi.number().integer().min(1).optional(),
  screeningAvailable: Joi.boolean().optional(),
  availableFrom: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional(), // Time format HH:MM
  availableTill: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional(), // Time format HH:MM
}).unknown();

const validateUpdateRoom = (req, res, next) => {
  const { error } = updateRoomSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateRoom = (req, res, next) => {
  const { error } = roomSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRoom,
  validateUpdateRoom,
};
