const bookingModel = require("../models/bookingModel");
const notificationModel = require("../models/notificationModel");

const addBooking = async (req, res) => {
  const {
    roomId,
    roomNumber,
    bookedBy,
    bookingFor,
    bookingDescription,
    bookingFrom,
    bookingTill,
  } = req.body;

  try {
    const bookingFromDate = new Date(bookingFrom);
    const bookingTillDate = new Date(bookingTill);

    if(bookingFromDate > bookingTillDate){
      return res.status(400).json({error: "Invalid booking range"})
    }

    const booking = await bookingModel.createBooking(
      roomId,
      roomNumber,
      bookedBy,
      bookingFor,
      bookingDescription,
      bookingFromDate,
      bookingTillDate
    );

    res.status(201).json({ message: "booking added successfully", booking });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAllBookings();

    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBooking = async (req, res) => {
  const {booking_id, user_id} = req.params;

  try {
    const booking = await bookingModel.getBookingById(booking_id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const result = await bookingModel.deleteBooking(booking_id);
    if (result === 0) {
      res.status(404).json({ error: "Booking not found" });
    }

    const notificationBody = `Your booking with id '${booking_id}' of room ${booking.room_number} was cancelled due to some unwanted circumstances.`;

    await notificationModel.createNotification(
      user_id,
      booking.booked_by,
      notificationBody
    );

    res
      .status(200)
      .json({ message: `Booking ${booking_id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBookingsByRoomNo = async (req, res) => {
  const { room_number } = req.params;

  try {
    const bookings = await bookingModel.getBookingsByRoomNo(room_number);
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBookingsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const bookings = await bookingModel.getBookingsByUser(user_id);
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchNotificationsByUser = async (req, res) =>{
  const { user_id } = req.params;

  try{
    const notifs = await notificationModel.fetchNotificationsByUser(user_id);
    res.status(200).json({notifs});
  }catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addBooking,
  getAllBookings,
  deleteBooking,
  getBookingsByRoomNo,
  getBookingsByUser,
  fetchNotificationsByUser
};
