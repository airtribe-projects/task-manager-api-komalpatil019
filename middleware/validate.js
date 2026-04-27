export const validateTask = (req, res, next) => {
    const { title } = req.body;
  
    if (!title || title.length < 3) {
      return res.status(400).json({
        error: "Title must be at least 3 characters",
      });
    }
  
    next();
  };