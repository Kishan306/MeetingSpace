import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRooms, fetchRooms } from "../../features/rooms/roomsSlice";
import RoomCard from "./RoomCard";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

function AllRooms() {
  const dispatch = useDispatch();
  const { rooms, status, error } = useSelector((state) => state.rooms);

  const [capacityFilter, setCapacityFilter] = useState(null);
  const [roomNumberFilter, setRoomNumberFilter] = useState(null);

  useEffect(()=>{
    dispatch(clearRooms());
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  const filteredRooms = rooms.filter((room) => {
    return (
      (capacityFilter === null || room.capacity > capacityFilter) &&
      (roomNumberFilter === null || room.room_number === roomNumberFilter)
    );
  });

  return (
    <>
      <h2 className="ml-14 md:ml-24 mb-8 text-3xl md:text-5xl font-bold mt-8 ">
        All Rooms
      </h2>
      <div className="flex flex-col md:flex-row justify-between md:justify-start p-6 mt-4 px-14 md:px-36">
        <FloatLabel>
          <InputNumber
            value={capacityFilter}
            className="h-14 mr-12"
            mode="decimal"
            inputId="capacityrequired"
            onValueChange={(e) => {
              setCapacityFilter(e.value);
            }}
          />
          <label className="text-base" htmlFor="capacityrequired">
            Your capacity requirement:
          </label>
        </FloatLabel>

        <FloatLabel>
          <InputNumber
            value={roomNumberFilter}
            onValueChange={(e) => {
              setRoomNumberFilter(e.value);
            }}
            className="h-14 mr-12"
            mode="decimal"
            inputId="roomnumber"
          />
          <label className="text-base" htmlFor="roomnumber">
            Search By Room No.
          </label>
        </FloatLabel>
      </div>
      <div className="flex justify-start flex-wrap p-6 md:pl-24">
        {filteredRooms.length > 0 &&
          filteredRooms.map((room, index) => <RoomCard key={index} room={room} />)}
      </div>
        {filteredRooms.length == 0 && <div className="flex justify-center items-center h-1/2 text-xl text-gray-500">No room available</div>}
    </>
  );
}

export default AllRooms;
