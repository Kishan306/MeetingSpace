const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");
const { timeStringToDate, getformattedhours } = require("../utils/timeUtils");

/**
 * Middleware to check if the room is available during the requested booking period.
 */
const checkRoomAvailability = async (req, res, next) => {
  const { roomId, bookingFrom, bookingTill } = req.body; // Assume these are sent in the request body

  try {
    // Fetch room details
    const room = await roomModel.getRoomById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Convert times to Date objects
    const bookingFromDate = new Date(bookingFrom);
    const bookingTillDate = new Date(bookingTill);

    const bookingFromHours = getformattedhours(bookingFromDate);
    const bookingTillHours = getformattedhours(bookingTillDate);

    // Check if the booking times fall within the room's available times
    if (
      bookingFromHours < room.available_from ||
      bookingTillHours > room.available_till
    ) {
      return res.status(400).json({
        message: `Room ${room.room_number} is not available during the requested time. Available from ${room.available_from} to ${room.available_till}.`,
      });
    }

    // If all checks pass, proceed to the next middleware/controller
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  checkRoomAvailability,
};
