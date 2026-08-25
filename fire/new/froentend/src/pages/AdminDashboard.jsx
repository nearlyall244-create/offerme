import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data.stats);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load admin data');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <p className="text-gray-600 mb-6">Manage users, roles, and system settings.</p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg">Total Users</h3>
              <p className="text-3xl font-bold text-purple-600">{stats?.totalUsers ?? '--'}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg">Business Owners</h3>
              <p className="text-3xl font-bold text-purple-600">{stats?.totalBusinessOwners ?? '--'}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg">Admins</h3>
              <p className="text-3xl font-bold text-purple-600">{stats?.totalAdmins ?? '--'}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg">All Accounts</h3>
              <p className="text-3xl font-bold text-purple-600">{stats?.totalAll ?? '--'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
