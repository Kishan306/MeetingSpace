const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const { validateSignup, validateLogin } = require("./middleware/validation");
require("dotenv").config();
const adminCheck = require("./middleware/adminCheck");
const {
  validateRoom,
  validateUpdateRoom,
} = require("./middleware/roomValidation");
const { validateBooking } = require("./middleware/bookingValidation");
const {
  checkBookingAvailability,
} = require("./middleware/checkBookingAvailability");
const { checkRoomAvailability } = require("./middleware/checkRoomAvailability");

const { signup, login, deleteUser, getAllUsers } = require("./controllers/authController");

const {
  addRoom,
  deleteRoom,
  updateRoom,
  getAllRooms,
  getRoomByRoomNo,
  getRoomByTimeRange,
  getRoomByCapacity,
} = require("./controllers/roomController");

const {
  addBooking,
  getAllBookings,
  deleteBooking,
  getBookingsByRoomNo,
  getBookingsByUser
} = require("./controllers/bookingController");

const {
  fetchNotificationsByUser,
  markAllAsRead
} = require("./controllers/notificationController")

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

const app = express();
const port = 4000;

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.get("/api/rooms/all-rooms", getAllRooms);
app.get("/api/users/all-users",adminCheck, getAllUsers);
app.get("/api/rooms/:room_number(\\d+)", getRoomByRoomNo); // to avoid api clash, (\\d+) helps in defining that only numerical params are accepted
app.get("/api/rooms/opened-rooms", getRoomByTimeRange);
app.get("/api/rooms/by-capacity", getRoomByCapacity);
app.get("/api/all-bookings", adminCheck, getAllBookings);
app.get("/api/bookings-by-room/:room_number", getBookingsByRoomNo);
app.get("/api/bookings-by-user/:user_id", getBookingsByUser);
app.get('/api/notifications/:user_id', fetchNotificationsByUser)

app.post("/api/users/signup", validateSignup, signup);
app.post("/api/users/login", validateLogin, login);
app.post("/api/rooms/add-room", adminCheck, validateRoom, addRoom);
app.post(
  "/api/book-room",
  validateBooking,
  checkRoomAvailability,
  checkBookingAvailability,
  addBooking
);
app.post("/api/notifications/read/:user_id", markAllAsRead)

app.delete("/api/user/delete-user/:user_id", adminCheck, deleteUser);
app.delete("/api/rooms/delete-room/:room_id", adminCheck, deleteRoom);
app.delete("/api/bookings/delete-booking/:booking_id/:user_id", deleteBooking);

app.put(
  "/api/rooms/update-room/:room_id",
  adminCheck,
  validateUpdateRoom,
  updateRoom
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
