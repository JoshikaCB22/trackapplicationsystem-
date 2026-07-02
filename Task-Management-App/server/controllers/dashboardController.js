const Task = require('../models/Task');

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    const result = await Task.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
          dueToday: {
            $sum: {
              $cond: [
                { $and: [
                  { $gte: ['$dueDate', startOfDay] },
                  { $lte: ['$dueDate', endOfDay] }
                ]},
                1, 0
              ]
            }
          }
        }
      }
    ]);

    const stats = result[0] || { total: 0, completed: 0, pending: 0, inProgress: 0, dueToday: 0 };
    delete stats._id;

    res.json(stats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getDashboard };
