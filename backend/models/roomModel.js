const db = require("../config/db");

const findRoomByRoomNo = async (room_number) => {
  const [rows] = await db.query("SELECT * FROM rooms WHERE room_number = ?", [
    room_number,
  ]);
  return rows[0];
};

const createRoom = async (
  roomNumber,
  capacity,
  screeningAvailable,
  availableFrom,
  availableTill
) => {
  const [result] = await db.query(
    "INSERT INTO rooms (room_number, capacity, screening_available, available_from, available_till) VALUES (?, ?, ?, ?, ?)",
    [roomNumber, capacity, screeningAvailable, availableFrom, availableTill]
  );

  return result.insertId;
};

const deleteRoom = async (roomId) => {
  const [result] = await db.query("DELETE FROM rooms WHERE room_id=(?)", [
    roomId,
  ]);

  return result.affectedRows;
};

const updateRoom = async (roomId, updates) => {
  const {
    roomNumber,
    capacity,
    screeningAvailable,
    availableFrom,
    availableTill,
  } = updates;

  const [result] = await db.query(
    `UPDATE rooms SET 
        room_number = COALESCE(?, room_number),
        capacity = COALESCE(?, capacity),
        screening_available = COALESCE(?, screening_available),
        available_from = COALESCE(?, available_from),
        available_till = COALESCE(?, available_till),
        updated_at = CURRENT_TIMESTAMP
      WHERE room_id = ?`,
    [
      roomNumber,
      capacity,
      screeningAvailable,
      availableFrom,
      availableTill,
      roomId,
    ]
  );

  return result.affectedRows;
};

const getAllRooms = async () => {
  const [rows] = await db.query("SELECT * FROM rooms ORDER BY room_number");
  return rows;
};

const getRoomByRoomNo = async (room_number) => {
  const [rows] = await db.query("SELECT * FROM rooms WHERE room_number=?", [
    room_number,
  ]);
  return rows[0];
};

const getRoomById = async (room_id) => {
  const [rows] = await db.query("SELECT * FROM rooms WHERE room_id=?", [
    room_id,
  ]);
  return rows[0];
};


const getRoomByTimeRange = async (needed_from, needed_till) => {
  const [rows] = await db.query(
    "SELECT * FROM rooms WHERE available_from <= ? AND available_till >= ?",
    [needed_from, needed_till]
  );
  return rows;
};

const getRoomByCapacity = async (capacity) => {
  const [rows] = await db.query("SELECT * FROM rooms WHERE capacity >= ?", [
    capacity,
  ]);
  return rows;
};

module.exports = {
  createRoom,
  deleteRoom,
  findRoomByRoomNo,
  updateRoom,
  getAllRooms,
  getRoomByRoomNo,
  getRoomById,
  getRoomByTimeRange,
  getRoomByCapacity,
};
