const db = require("../config/db");

const createBooking = async (
  roomId,
  roomNumber,
  bookedBy,
  bookingFor,
  bookingDescription,
  bookingFrom,
  bookingTill
) => {
  const [result] = await db.query(
    "INSERT INTO bookings (room_id, room_number, booked_by, booking_for, booking_description, booking_from, booking_till) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      roomId,
      roomNumber,
      bookedBy,
      bookingFor,
      bookingDescription,
      bookingFrom,
      bookingTill,
    ]
  );
  return result;
};

const getAllBookings = async () => {
  const [result] = await db.query("SELECT * FROM bookings");
  return result;
};

const deleteBooking = async (bookingId) => {
  const [result] = await db.query("DELETE FROM bookings WHERE booking_id=(?)", [
    bookingId,
  ]);

  return result.affectedRows;
};

const getBookingsByRoomNo = async (room_number) => {
  const [rows] = await db.query("SELECT * FROM bookings WHERE room_number=?", [
    room_number,
  ]);
  return rows;
};

const getBookingById = async (bookingId) => {
  const [rows] = await db.query(
    `
    SELECT booking_id, room_number, booked_by, room_id
    FROM bookings 
    WHERE booking_id = ?
  `,
    [bookingId]
  );
  return rows[0];
};

const getBookingsByUser = async (user_id) => {
  const [rows] = await db.query("SELECT * FROM bookings WHERE booked_by=? ORDER BY booking_from", [
    user_id,
  ]);
  return rows;
};

const checkOverlappingBookings = async (roomId, bookingFrom, bookingTill) => {
  const [rows] = await db.query(
    `SELECT * FROM bookings 
     WHERE room_id = ? 
       AND (booking_from < ? AND booking_till > ?)`,
    [roomId, bookingTill, bookingFrom]
  );
  return rows;
};

module.exports = {
  createBooking,
  getAllBookings,
  deleteBooking,
  getBookingsByRoomNo,
  getBookingsByUser,
  checkOverlappingBookings,
  getBookingById
};
