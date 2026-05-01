const validateTask = (req, res, next) => {
  const {
    title,
    description,
    completed,
    priority,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: "Title and description are required",
    });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Completed must be boolean",
    });
  }

  next();
};

module.exports = validateTask;