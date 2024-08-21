import { useForm, Controller } from "react-hook-form";
import { Calendar } from 'primereact/calendar';
import { getformattedhours } from "../../utils/dateService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRoom } from "../../features/rooms/roomsSlice";

function AddRoom() {

    const dispatch = useDispatch();

    //useFetchUser();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        const { roomNumber, capacity, availableFrom, availableTill, ...rest } = data;
        const convertedData = {
            roomNumber: Number(roomNumber),
            capacity: Number(capacity),
            availableFrom: getformattedhours(availableFrom),
            availableTill: getformattedhours(availableTill),
            ...rest,
        };
        dispatch(addRoom(convertedData)).then(()=>{
            navigate('/all-rooms')
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-full md:w-7/12 md:mx-auto">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-md rounded-lg w-4/5 p-8 mx-auto"
                >
                    <h2 className="text-3xl font-semibold mb-2 mx-auto">Add Room</h2>
                    <div>
                        <label htmlFor="roomnumber" className="block text-sm font-medium text-gray-700"
                        >Room Number:</label>
                        <input
                            id="roomnumber"
                            type="number"
                            {...register('roomNumber', { required: true })}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.roomNumber && <p className="ml-2 text-red-600">Enter valid room number</p>}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700"
                        >Capacity:</label>
                        <input
                            id="capacity"
                            type="number"
                            {...register('capacity', { required: true, min: 5, max: 200 })}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.capacity && <p className="ml-2 text-red-600">Enter a number between 5-200</p>}
                    </div>
                    <div className="mt-4 flex flex-row">
                        <label htmlFor="screening" className="block text-sm font-medium text-gray-700"
                        >Does it have screening available?</label>
                        <input
                            id="screening"
                            {...register('screeningAvailable', { required: false })}
                            type="checkbox"
                            className="px-3 py-2 ml-4 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="availableFrom"
                            className="block text-sm font-medium text-gray-700"
                        >Available from:</label>
                        <Controller
                            rules={{ required: true }}
                            name="availableFrom"
                            control={control}
                            render={({ field }) => (
                                <Calendar timeOnly value={field.value} onChange={(e) => field.onChange(e.value)} />
                            )}
                        />
                        {errors.availableTill && <p className="ml-2 text-red-600">Enter valid time</p>}
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="availableTill"
                            className="block text-sm font-medium text-gray-700"
                        >Available till:</label>
                        <Controller
                            rules={{ required: true }}
                            name="availableTill"
                            control={control}
                            render={({ field }) => (
                                <Calendar timeOnly value={field.value} onChange={(e) => field.onChange(e.value)} />
                            )}
                        />
                        {errors.availableTill && <p className="ml-2 text-red-600">Enter valid time</p>}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700  active:scale-90 transition duration-200 ease-in-out">Add Room</button>
                        <button type="button" onClick={() => { reset() }} className="px-4 py-2 ml-8 rounded-md bg-red-500 text-white hover:bg-red-600  active:scale-90 transition duration-200 ease-in-out">Reset Form</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddRoom;