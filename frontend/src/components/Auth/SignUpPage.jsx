import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../features/user/userSlice';
import { clearNotifications, fetchNotifications } from "../../features/notifications/notifications";
import { getCurrentUser } from "../../utils/auth";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (user) {
      navigate('/all-rooms');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, email, password })).then(()=>{
      dispatch(clearNotifications())
      dispatch(fetchNotifications(getCurrentUser().id))
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full lg:w-5/12 md:mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
        {error && (
          <div className="mb-4 p-4 text-red-600 bg-red-200 border border-red-300 rounded">
            {error.error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg w-4/5 p-8 mx-auto space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 mb-2 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            {status === 'loading' ? 'Loading...' : 'Sign Up'}
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
