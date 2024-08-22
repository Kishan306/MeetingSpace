import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (id) => {
    const response = await apiClient.get(`/api/bookings-by-user/${id.id}`);
    return response.data.bookings;
  }
);

export const fetchBookingsByRoomNo = createAsyncThunk(
  'bookings/bookingsByRoom',
  async(roomNo)=>{
    const response = await apiClient.get(`/api/bookings-by-room/${roomNo}`);
    return response.data.bookings;
  }
)

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (bookingData) => {
    const response = await apiClient.post("/api/book-room", bookingData);
    return response.data.bookings;
  }
);

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async ({id, user_id}) => {
  await apiClient.delete(`/api/bookings/delete-booking/${id}/${user_id}`);
  return id;
});

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearBookings: (state)=>{
      state.bookings = [];
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state)=>{
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload); // Add the new room to the list
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookingsByRoomNo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingsByRoomNo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsByRoomNo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { clearBookings, clearError } = bookingSlice.actions;
export default bookingSlice.reducer;
