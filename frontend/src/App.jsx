import LoginPage from "./components/Auth/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./components/Auth/SignUpPage";
import NavigationBar from "./components/shared/NavigationBar";
import NotFound from "./components/shared/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AddRoom from "./components/Admin/AddRoom";
import EditRoom from "./components/Admin/EditRoom";
import BookRoom from "./components/main/BookRoom";
import AllRooms from "./components/main/AllRooms";
import AllUsers from "./components/Admin/AllUsers";
import UserBookings from "./components/main/UserBookings";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  // useAuthCheck()
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/all-rooms"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <AllRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-room/:room_number/:room_id"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <BookRoom/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-bookings/:id"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <UserBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-room"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-room/:room_number"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditRoom />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
