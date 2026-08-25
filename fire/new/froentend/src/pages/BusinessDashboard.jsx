import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const BusinessDashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">
            Welcome, {userProfile?.name || 'Business Owner'}!
          </h2>
          <p className="text-gray-600 mb-6">Manage your services and bookings.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg">Active Services</h3>
              <p className="text-3xl font-bold text-green-600">--</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg">Pending Bookings</h3>
              <p className="text-3xl font-bold text-green-600">--</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{userProfile?.email}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{userProfile?.phone}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{userProfile?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
