const Score = require("../models/scoreModel");

// @Route   POST /api/v1/score/register
// @Desc    Registers a new score
// @Access  Private

const registerScore = async (req, res) => {
  try {
    const { wpm, accuracy, value } = req.body;
    const score = await Score.create({
      userId: req.user.id,
      userName: req.user.name,
      wpm,
      accuracy,
      value,
    });

    return res.status(200).json({
      status: "success",
      data: { score },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      data: { message: err.message },
    });
  }
};

// @Route   GET /api/v1/score/get/current
// @Desc    Gets the current user's scores
// @Access  Private

const viewUserScores = async (req, res) => {
  try {
    const userScores = await Score.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["value", "DESC"]],
    });

    return res.status(200).json({
      status: "success",
      data: userScores,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      data: { message: err.message },
    });
  }
};

// @Route   GET /api/v1/score/get/all
// @Desc    Gets all scores
// @Access  Public

const viewAllScores = async (_req, res) => {
  try {
    const allScores = await Score.findAll({
      order: [["value", "DESC"]],
    });
    return res.status(200).json({
      status: "success",
      data: allScores,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      data: { message: err.message },
    });
  }
};

module.exports = { registerScore, viewUserScores, viewAllScores };
