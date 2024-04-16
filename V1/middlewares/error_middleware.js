const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);

    next();
  } catch (err) {
    const message = err.errors?.[0]?.message || "Validation error";

    res.status(400).json({ msg: message });
  }
};
export default validate;
