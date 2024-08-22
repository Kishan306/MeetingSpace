const notificationModel = require("../models/notificationModel");

const fetchNotificationsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const notifs = await notificationModel.fetchNotificationsByUser(user_id);
    res.status(200).json({ notifs });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const markAllAsRead = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await notificationModel.markAllAsRead(user_id);
        res.status(200).json({message: "Marked all as read"});
    } catch (err) {
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {
    fetchNotificationsByUser,
    markAllAsRead
}
