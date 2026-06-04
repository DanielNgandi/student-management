const validateScore = (req, res, next) => {
  const { catScore, examScore } = req.body;

  if (catScore < 0 || catScore > 40) {
    return res.status(400).json({
      success: false,
      message: "CAT score must be between 0 and 40",
    });
  }

  if (examScore < 0 || examScore > 60) {
    return res.status(400).json({
      success: false,
      message: "Exam score must be between 0 and 60",
    });
  }

  next();
};

export default validateScore;