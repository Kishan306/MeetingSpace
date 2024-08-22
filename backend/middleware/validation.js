const Joi = require("joi");

const usernameSchema = Joi.string().alphanum().min(3).max(15).required();
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
  )
  .required();

const validateSignup = (req, res, next) => {
  const { username, email, password } = req.body;

  const { error: usernameError } = usernameSchema.validate(username.trim());
  if (usernameError) return res.status(400).json({ error: "Invalid username" });

  const { error: emailError } = emailSchema.validate(email);
  if (emailError) return res.status(400).json({ error: "Invalid email" });

  const { error: passwordError } = passwordSchema.validate(password);
  if (passwordError) return res.status(400).json({ error: "Invalid password" });

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const { error: emailError } = emailSchema.validate(email);
  if (emailError) return res.status(400).json({ error: "Invalid email" });

  const { error: passwordError } = passwordSchema.validate(password);
  if (passwordError) return res.status(400).json({ error: "Invalid password" });

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
};
