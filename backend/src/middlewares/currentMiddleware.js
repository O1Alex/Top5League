const monthService = require("../services/monthService");

const currentMonth = async (req, res, next) => {
  try {
    req.currentMonth = await monthService.getCurrentMonth();
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { currentMonth };