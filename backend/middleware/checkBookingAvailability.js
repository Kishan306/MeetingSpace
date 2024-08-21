const bookingModel = require("../models/bookingModel");

const checkBookingAvailability = async (req, res, next) => {
  const { roomId, bookingFrom, bookingTill } = req.body;

  try {
    // Convert to Date objects
    const bookingFromDate = new Date(bookingFrom);
    const bookingTillDate = new Date(bookingTill);

    // Ensure the dates are valid
    if (isNaN(bookingFromDate.getTime()) || isNaN(bookingTillDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Check for overlapping bookings
    const overlappingBookings = await bookingModel.checkOverlappingBookings(
      roomId,
      bookingFromDate,
      bookingTillDate
    );

    if (overlappingBookings.length > 0) {
      return res
        .status(400)
        .json({
          error: "The room is already booked during the specified time range",
        });
    }

    // Proceed to the next middleware/controller
    next();
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { checkBookingAvailability };
