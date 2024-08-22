const db = require("../config/db");

const createNotification = async (senderId, receiverId, body) => {
  const [result] = await db.query(
    "INSERT INTO notifications (sender_id, receiver_id, body, reading_status) VALUES (?, ?, ?, ?)",
    [senderId, receiverId, body, "unread"]
  );
  return result;
};

const fetchNotificationsByUser = async (user_id) => {
  const [result] = await db.query(
    "SELECT * FROM notifications WHERE receiver_id = ? ORDER BY created_at DESC", [user_id]
  );
  return result;
}

const markAllAsRead = async (user_id) => {
  const [result] = await db.query(
    "UPDATE notifications SET reading_status = 'read' WHERE receiver_id = ?", [user_id]
  );
  return result;
}

module.exports = {
  createNotification,
  fetchNotificationsByUser,
  markAllAsRead
};
