const express = require('express');
const router = express.Router();

const { validateSignup, validateLogin } = require("../middleware/validation");
const adminCheck = require("../middleware/adminCheck");
const {
  validateRoom,
  validateUpdateRoom,
} = require("../middleware/roomValidation");
const { validateBooking } = require("../middleware/bookingValidation");
const {
  checkBookingAvailability,
} = require("../middleware/checkBookingAvailability");
const { checkRoomAvailability } = require("../middleware/checkRoomAvailability");

const { signup, login, deleteUser, getAllUsers } = require("../controllers/authController");

const {
  addRoom,
  deleteRoom,
  updateRoom,
  getAllRooms,
  getRoomByRoomNo,
  getRoomByTimeRange,
  getRoomByCapacity,
} = require("../controllers/roomController");

const {
  addBooking,
  getAllBookings,
  deleteBooking,
  getBookingsByRoomNo,
  getBookingsByUser
} = require("../controllers/bookingController");

const {
  fetchNotificationsByUser,
  markAllAsRead
} = require("../controllers/notificationController")

router.get("/api/rooms/all-rooms", getAllRooms);
router.get("/api/users/all-users",adminCheck, getAllUsers);
router.get("/api/rooms/:room_number(\\d+)", getRoomByRoomNo); // to avoid api clash, (\\d+) helps in defining that only numerical params are accepted
router.get("/api/rooms/opened-rooms", getRoomByTimeRange);
router.get("/api/rooms/by-capacity", getRoomByCapacity);
router.get("/api/all-bookings", adminCheck, getAllBookings);
router.get("/api/bookings-by-room/:room_number", getBookingsByRoomNo);
router.get("/api/bookings-by-user/:user_id", getBookingsByUser);
router.get('/api/notifications/:user_id', fetchNotificationsByUser)

router.post("/api/users/signup", validateSignup, signup);
router.post("/api/users/login", validateLogin, login);
router.post("/api/rooms/add-room", adminCheck, validateRoom, addRoom);
router.post(
  "/api/book-room",
  validateBooking,
  checkRoomAvailability,
  checkBookingAvailability,
  addBooking
);
router.post("/api/notifications/read/:user_id", markAllAsRead)

router.delete("/api/user/delete-user/:user_id", adminCheck, deleteUser);
router.delete("/api/rooms/delete-room/:room_id", adminCheck, deleteRoom);
router.delete("/api/bookings/delete-booking/:booking_id/:user_id", deleteBooking);

router.put(
  "/api/rooms/update-room/:room_id",
  adminCheck,
  validateUpdateRoom,
  updateRoom
);

module.exports = router;