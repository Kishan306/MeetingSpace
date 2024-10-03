import { useState, useRef, useEffect } from "react";
import { Avatar, Menu } from "primereact";
import { Badge } from "primereact/badge";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "primereact/sidebar";
import {
  clearNotifications,
  fetchNotifications,
  markAllAsRead,
} from "../../features/notifications/notifications";
import { formatDate } from "../../utils/dateService";
import { logout } from "../../features/user/userSlice";
import { ProgressSpinner } from "primereact/progressspinner";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const menuRight = useRef(null);

  const [email, setEmail] = useState("");

  //==============notification==============
  const [notificationPanel, setNotificationPanel] = useState(false);

  const { notifications, status } = useSelector((state) => state.notifications);

  const hasUnreadNotification = notifications.some(
    (notification) => notification.reading_status === "unread"
  );

  const unreadNotifications = notifications.filter(
    (notification) => notification.reading_status === "unread"
  ).length;

  useEffect(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
    if (status === "idle") {
      dispatch(fetchNotifications(user?.id));
    }
    if (hasUnreadNotification) {
      setNotificationPanel(true);
    }
  }, [status, user, dispatch, hasUnreadNotification]);
  //==============notification==============

  const avatar = email.slice(0, 1).toUpperCase();

  const onLoginClick = () => {
    navigate("/login");
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const onLogOutClick = () => {
    // logout logic here
    dispatch(logout()).then(() => {
      setEmail("");
      navigate("/login");
    });
  };

  if (status === "loading")
    return (
      <div className="h-96 flex justify-center items-center">
        <ProgressSpinner />
      </div>
    );

  return (
    <>
      {user && (
        <Sidebar
          visible={notificationPanel}
          position="right"
          onHide={() => setNotificationPanel(false)}
        >
          <div className="flex flex-row mb-6 mt-2">
            <h3 className="text-xl font-semibold">Notifications</h3>
            <button
              onClick={() => {
                dispatch(markAllAsRead(user?.id)).then(() => {
                  dispatch(fetchNotifications(user?.id));
                });
              }}
              className={`py-1 px-2 ml-2 ${
                unreadNotifications > 0
                  ? "bg-red-500 active:scale-90 hover:bg-red-400"
                  : "bg-gray-500 hover:bg-gray-400"
              } rounded-full text-white transition duration-300 ease-in-out`}
            >
              Mark all as read
            </button>
          </div>
          {notifications &&
            notifications.length > 0 &&
            notifications.map((notification, index) => (
              <div key={index} className="mb-6">
                <hr className="h-px bg-gray-300" />
                <p className="font-semibold">
                  {notification.reading_status == "unread" && (
                    <Badge severity="danger" className="mb-1 mr-2"></Badge>
                  )}
                  {formatDate(notification.created_at)}
                </p>
                <p>{notification.body}</p>
              </div>
            ))}
          {notifications && notifications.length == 0 && (
            <div className="h-full flex justify-center items-center text-lg">
              No new notifications
            </div>
          )}
        </Sidebar>
      )}
      <nav className="bg-blue-500 py-4 min-h-16 sticky top-0 z-50 w-full shadow-xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Navigation Links */}
            <div className="hidden md:block ml-10 mr-auto">
              <ul className="flex space-x-12 text-white text-lg font-light">
                <li>
                  <Link to="/all-rooms" className="hover:text-gray-300">
                    All Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/user-bookings/${user?.id}`}
                    className="hover:text-gray-300"
                  >
                    {user && user.id && "My Bookings"}
                  </Link>
                </li>
                {user && user.role == "admin" && (
                  <li>
                    <Link to="/all-users" className="hover:text-gray-300">
                      All Users
                    </Link>
                  </li>
                )}
                {user && user.role == "admin" && (
                  <li>
                    <Link to="/add-room" className="hover:text-gray-300">
                      Add Room
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="ml-auto relative">
              {!user ? (
                <div>
                  <button
                    className="bg-white md:mr-2 py-2 px-5 rounded-full font-semibold hover:bg-gray-100 scale-75 md:scale-100 md:active:scale-90 transition duration-200 ease-in-out"
                    onClick={onLoginClick}
                  >
                    Login
                  </button>

                  <button
                    className="bg-white py-2 px-5 rounded-full font-semibold hover:bg-gray-100 scale-75 md:scale-100 md:active:scale-90 transition duration-200 ease-in-out"
                    onClick={onSignUpClick}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <i
                    className="pi pi-bell text-white mr-8 text-2xl p-overlay-badge"
                    onClick={() => setNotificationPanel(true)}
                  >
                    {hasUnreadNotification && (
                      <Badge
                        value={unreadNotifications}
                        severity="danger"
                      ></Badge>
                    )}
                  </i>
                  <Avatar
                    label={avatar}
                    size="large"
                    style={{
                      backgroundColor: "rgb(249 250 251)",
                      color: "#2a1261",
                      width: "48px",
                      height: "48px",
                      fontSize: "20px",
                    }}
                    className="font-bold"
                    shape="circle"
                    onClick={(event) => menuRight.current.toggle(event)}
                    aria-controls="popup_menu_right"
                    aria-haspopup
                  />
                  <Menu
                    model={[
                      {
                        label: "Log Out",
                        icon: "pi pi-sign-out",
                        command: onLogOutClick,
                      },
                    ]}
                    ref={menuRight}
                    id="popup_menu_right"
                    popup={true}
                    className="origin-top-right p-2 absolute font-semibold right-0 mt-2 w-44 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
