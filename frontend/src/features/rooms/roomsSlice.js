import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await apiClient.get("/api/rooms/all-rooms");
  return response.data.rooms;
});

export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (roomData) => {
    const response = await apiClient.post("/api/rooms/add-room", roomData);
    return response.data.room;
  }
);

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
  await apiClient.delete(`/api/rooms/delete-room/${id}`);
  return id;
});

// Room Slice
const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearRooms: (state)=>{
      state.rooms = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms.push(action.payload); // Add the new room to the list
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
