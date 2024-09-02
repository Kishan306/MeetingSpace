import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const fetchNotifications = createAsyncThunk(
  "notifications",
  async (user_id) => {
    const response = await apiClient.get(`/api/notifications/${user_id}`);
    return response.data.notifs;
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/read",
  async (user_id) =>{
    const response = await apiClient.post(`/api/notifications/read/${user_id}`);
    return response;
  }
)

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload; // Set the fetched room data
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(markAllAsRead.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = state.notifications.map(notification =>
          notification.reading_status === 'unread' ? { ...notification, reading_status: 'read' } : notification
        );
        state.message = action.payload.message; // Update with response message if needed
      })
      .addCase(markAllAsRead.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
