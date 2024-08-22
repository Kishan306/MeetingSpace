import { useForm, Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBooking } from "../../features/bookings/bookingSlice";
import { useEffect } from "react";
import { fetchBookingsByRoomNo } from "../../features/bookings/bookingSlice";
import { formatDate } from "../../utils/dateService";
import { clearBookings, clearError } from "../../features/bookings/bookingSlice";
import { ProgressSpinner } from 'primereact/progressspinner';

function BookRoom() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const { room_number, room_id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const { bookings, status, error } = useSelector((state) => state.bookings);

  if(error){
    alert("Cant book in this slot, check slots")
    dispatch(clearError())
  }

  useEffect(() => {
    dispatch(clearBookings());
    dispatch(clearError())
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookingsByRoomNo(room_number));
    }
  }, [dispatch, status, room_number]);

  const onSubmit = (data) => {
    const {  ...rest } = data;
    const convertedData = {
      roomNumber: Number(room_number),
      roomId: Number(room_id),
      bookedBy: user.id,
      ...rest,
    };
    dispatch(addBooking(convertedData)).then(() => {
        navigate("/all-rooms");
    });
  };
  
  if (status === "loading") return <div className="h-96 flex justify-center items-center"><ProgressSpinner/></div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="w-full md:w-7/12 md:mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-lg w-4/5 p-8 mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-2 mx-auto">Book Room {room_number}</h2>
            <div>
              <label
                htmlFor="bookingfor"
                className="block text-sm font-medium text-gray-700"
              >
                Booking For:
              </label>
              <input
                id="bookingfor"
                type="text"
                {...register("bookingFor", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.bookingFor && (
                <p className="ml-2 text-red-600">Enter valid booking reason</p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="bookingdescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description(optional):
              </label>
              <input
                id="bookingdescription"
                type="textarea"
                {...register("bookingDescription", {
                  required: false,
                  minLength: 7,
                  maxLength: 100,
                })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.bookingDescription && (
                <p className="ml-2 text-red-600">Enter valid description</p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="bookingfrom"
                className="block text-sm font-medium text-gray-700"
              >
                Booking from:
              </label>
              <Controller
                rules={{ required: true }}
                name="bookingFrom"
                control={control}
                render={({ field }) => (
                  <Calendar
                    showTime
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                  />
                )}
              />
              {errors.bookingFrom && (
                <p className="ml-2 text-red-600">Enter valid time</p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="bookingtill"
                className="block text-sm font-medium text-gray-700"
              >
                Booking till:
              </label>
              <Controller
                rules={{ required: true }}
                name="bookingTill"
                control={control}
                render={({ field }) => (
                  <Calendar
                    showTime
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                  />
                )}
              />
              {errors.bookingTill && (
                <p className="ml-2 text-red-600">Enter valid time</p>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700  active:scale-90 transition duration-200 ease-in-out"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                }}
                className="px-4 py-2 ml-8 rounded-md bg-red-500 text-white hover:bg-red-600  active:scale-90 transition duration-200 ease-in-out"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-24">
        <p className="text-2xl font-semibold mb-2">Booked Slots:</p>
        <table className="w-80 md:w-96 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings &&
              bookings.length > 0 &&
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {formatDate(booking?.booking_from)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {formatDate(booking?.booking_till)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {bookings && bookings.length == 0 && <div className="text-gray-500 mt-8">No bookings done for this room</div>}
      </div>
    </>
  );
}

export default BookRoom;
