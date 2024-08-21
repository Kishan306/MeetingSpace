import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const fetchRoomByRoomNo = createAsyncThunk(
  "rooms/fetchRoomByRoomNo",
  async (room_number) => {
    const response = await apiClient.get(`/api/rooms/${room_number}`);
    return response.data.room;
  }
);

export const editRoom = createAsyncThunk(
    "rooms/editRoom",
    async ( {id, roomData} ) => {
      const response = await apiClient.put(
        `/api/rooms/update-room/${id}`,
        roomData
      );
      return response.data;
    }
  );

const roomSlice = createSlice({
  name: "room",
  initialState: {
    room: {},
    status: "idle",
    error: null,
  },
  reducers: {
    clearRoom: (state) => {
        state.room = {};
        state.status = 'idle';
        state.error = null;
      }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchRoomByRoomNo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoomByRoomNo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.room = {}
        state.room = action.payload; // Set the fetched room data
      })
      .addCase(fetchRoomByRoomNo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally update the current room if it was successfully edited
        if (state.room.id === action.payload.id) {
          state.room = action.payload;
        }
      })
      .addCase(editRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
