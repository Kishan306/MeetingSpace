import { useState, useRef, useEffect } from "react";
import { Avatar, Menu } from "primereact";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "primereact/sidebar";
import { clearNotifications, fetchNotifications } from "../../features/notifications/notifications";
import { formatDate } from "../../utils/dateService";
import { logout } from "../../features/user/userSlice";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationPanel, setNotificationPanel] = useState(false);
  const user = useSelector((state) => state.user.user);

  const { notifications, status, error } = useSelector((state) => state.notifications);

  const menuRight = useRef(null);

  const [email, setEmail] = useState("");

  useEffect(()=>{
    dispatch(clearNotifications())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
    if (status === "idle") {
      dispatch(fetchNotifications(user?.id));
    }
  }, [status, user, dispatch]);

  const avatar = email.slice(0, 1).toUpperCase();
  const onLoginClick = () => {
    navigate("/login");
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const onLogOutClick = () => {
    // logout logic here
    dispatch(logout()).then(()=>{
      setEmail("")
      navigate("/login")
    });
  };

  return (
    <>
      <Sidebar
        visible={notificationPanel}
        position="right"
        onHide={() => setNotificationPanel(false)}
      >
        <div className="flex flex-row mb-6 mt-2">
          <h3 className="text-xl font-semibold">Notifications</h3>
        </div>
        {notifications &&
          notifications.length > 0 &&
          notifications.map((notification, index) => (
            <div key={index} className="mb-6">
              <hr className="h-px bg-gray-300" />
              <p className="font-semibold">
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
      <nav className="bg-gray-800 py-4 min-h-16 sticky top-0 z-50 w-full">
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
                    className="pi pi-bell text-white mr-8 text-2xl"
                    onClick={() => setNotificationPanel(true)}
                  />
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
                    className="origin-top-right p-2 absolute font-semibold right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onHide={() => setMenuOpen(false)}
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
