import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../features/user/allUserSlice";
import { useNavigate } from "react-router-dom";

function AllUsers() {
  //useFetchUser()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <div className="flex justify-center ">
      <table className=" divide-y divide-gray-200 w-3/4 mt-12">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
            >
              All Bookings
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length > 0 &&
            users.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      navigate(`/user-bookings/${user.user_id}`);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    View All Bookings
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => {
                      dispatch(deleteUser(user.user_id));
                    }}
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                      user.role === "admin"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
