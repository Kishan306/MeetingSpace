import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBookings, fetchBookings } from "../../features/bookings/bookingSlice";
import { useParams } from "react-router-dom";
import { deleteBooking } from "../../features/bookings/bookingSlice";
import { formatDate } from "../../utils/dateService";
import { clearNotifications, fetchNotifications } from "../../features/notifications/notifications";
import { ProgressSpinner } from 'primereact/progressspinner';

function UserBookings() {
  const id = useParams();
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.user.user); 

  useEffect(() => {
    dispatch(clearBookings());
  }, [dispatch]);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookings(id));
    }
  }, [dispatch, status, id]);
  
  const handleDelete = (bookingId) => {
    dispatch(deleteBooking({ id: bookingId, user_id: user.id })).then(()=>{
      dispatch(fetchBookings(id)).then(()=>{
        dispatch(clearNotifications()).then(()=>{
          dispatch(fetchNotifications(id));
        })
      })
    });
  };

  if (status === "loading") return <div className="h-96 flex justify-center items-center"><ProgressSpinner/></div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <>
      <div className="flex justify-center">
        <table className="divide-y divide-gray-200 w-3/4 mt-12">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                Room No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                Booking ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                Booked From
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                Booked Till
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings && bookings.length > 0 &&
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td className="px-14 py-4 whitespace-nowrap">
                    {booking?.room_number}
                  </td>
                  <td className="px-14 py-4 whitespace-nowrap">
                    {booking?.booking_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(booking?.booking_from)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(booking?.booking_till)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleDelete(booking.booking_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      <i className="pi pi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {bookings.length === 0 && (
        <div className="h-96 flex justify-center items-center w-full text-xl text-gray-500">
          No Bookings to show
        </div>
      )}
    </>
  );
}

export default UserBookings;
