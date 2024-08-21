import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // -1 indicates going back one step in the history stack
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
                <p className="text-lg text-gray-600 mt-4">
                    The page you requested could not be found.
                </p>

                <button onClick={handleGoBack}
                    className="inline-flex items-center px-4 py-2 mt-8 text-white hover:text-white bg-gray-600 rounded-md hover:bg-gray-700  active:scale-90 transition duration-200 ease-in-out">Go
                    Back</button>
            </div>

        </div>
    )
}

export default NotFound;