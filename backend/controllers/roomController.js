const roomModel = require("../models/roomModel");

const addRoom = async (req, res) => {
  const {
    roomNumber,
    capacity,
    screeningAvailable,
    availableFrom,
    availableTill,
  } = req.body;

  try {
    const existingRoom = await roomModel.findRoomByRoomNo(roomNumber);
    if (existingRoom) {
      return res
        .status(400)
        .json({ error: "Room with this room number already exists." });
    }
    const roomId = await roomModel.createRoom(
      roomNumber,
      capacity,
      screeningAvailable,
      availableFrom,
      availableTill
    );
    res.status(201).json({ message: "room added successfully", roomId });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRoom = async (req, res) => {
  const { room_id } = req.params;

  try {
    const result = await roomModel.deleteRoom(room_id);
    if (result === 0) {
      res.status(404).json({ error: "room not found" });
    }
    res.status(200).json({ message: `room ${room_id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateRoom = async (req, res) => {
  const { room_id } = req.params;
  const updates = req.body;

  try {
    const affectedRows = await roomModel.updateRoom(room_id, updates);

    if (affectedRows === 0) {
      res.status(404).json({ error: "room not found" });
    }

    res.status(200).json({ message: "room updates successfully" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAllRooms();
    res.status(200).json({ rooms });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRoomByRoomNo = async (req, res) => {
  const { room_number } = req.params;
  try {
    const room = await roomModel.getRoomByRoomNo(room_number);

    if (!room) {
      res
        .status(404)
        .json({ error: "Room with this room number doesn't exist" });
    }

    res.status(200).json({ room });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRoomByTimeRange = async (req, res) => {
  const { needed_from, needed_till } = req.body;

  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timePattern.test(needed_from) || !timePattern.test(needed_till)) {
    return res.status(400).json({ error: "Invalid time format. Use HH:MM." });
  }
  try {
    const rooms = await roomModel.getRoomByTimeRange(needed_from, needed_till);

    if (rooms.length == 0) {
      return res
        .status(404)
        .json({ error: "No room found within this time range" });
    }
    res.status(200).json({ rooms });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRoomByCapacity = async (req, res) => {
  const { capacity } = req.body;

  try {
    const rooms = await roomModel.getRoomByCapacity(capacity);

    res.status(200).json({ rooms });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addRoom,
  deleteRoom,
  updateRoom,
  getAllRooms,
  getRoomByRoomNo,
  getRoomByTimeRange,
  getRoomByCapacity,
};
