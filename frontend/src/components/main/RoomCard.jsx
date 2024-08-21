/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { deleteRoom, fetchRooms } from "../../features/rooms/roomsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function RoomCard({ room }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  return (
    <div className=" h-80 relative border-none shadow-lg rounded-lg m-10 hover:shadow-xl transition duration-300 p-6">
      <h1 className="text-4xl font-medium text-slate-500 mb-6">
        Room:{" "}
        <span className="text-5xl font-semibold text-gray-600">{room?.room_number}</span>
      </h1>
      <h3 className="text-lg text-slate-400">
        Capacity: <span className="font-semibold text-slate-500">{room?.capacity}</span>
      </h3>
      <h3 className="text-lg text-slate-400">
        Screening:
        <span className="ml-2 font-semibold text-slate-500">
          {room?.screening_available ? "Yes" : "No"}
        </span>
      </h3>
      <h3 className="text-lg mb-8 text-slate-400">
        Timings:
        <span className="font-semibold ml-2 text-slate-500">
          {room?.available_from} - {room?.available_till}
        </span>
      </h3>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => {
            navigate(`/book-room/${room?.room_number}/${room?.room_id}`);
          }}
          className="bg-blue-300 hover:bg-blue-400 transition duration-200 text-blue-600 font-semibold p-2 rounded-xl w-full"
        >
          Book Room
        </button>
      </div>
      {user && user.role === "admin" && (
        <div className="flex flex-row justify-around mt-2">
          <button
            onClick={() => {
              navigate(`/edit-room/${room?.room_number}`);
            }}
            className="bg-blue-300 mr-2 hover:bg-blue-400 transition duration-200 text-blue-600 p-2 rounded-xl w-full"
          >
            <i className="pi pi-pencil font-semibold"></i>
          </button>
          <button
            onClick={() => {
              dispatch(deleteRoom(room?.room_id)).then(() => {
                dispatch(fetchRooms());
              });
            }}
            className="bg-red-300 hover:bg-red-400 transition duration-200 text-red-600 p-2 rounded-xl w-full"
          >
            <i className="pi pi-trash font-semibold"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomCard;
