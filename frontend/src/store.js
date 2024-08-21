import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import roomsReducer from './features/rooms/roomsSlice';
import allUserReducer from './features/user/allUserSlice';
import bookingReducer from './features/bookings/bookingSlice';
import roomReducer from './features/rooms/roomSlice';
import notificationReducer from './features/notifications/notifications';

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    rooms: roomsReducer,
    users: allUserReducer,
    bookings: bookingReducer,
    notifications: notificationReducer
  },
  // Middleware and dev tools can be configured here
});