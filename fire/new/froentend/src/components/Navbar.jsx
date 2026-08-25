import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const dashboardPath =
    userProfile?.role === 'admin'
      ? '/admin/dashboard'
      : userProfile?.role === 'business_owner'
      ? '/business/dashboard'
      : '/user/dashboard';

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to={dashboardPath} className="text-xl font-bold text-gray-800">
            NearlyAll
          </Link>
          <div className="flex items-center gap-4">
            {userProfile && (
              <span className="text-sm text-gray-600 capitalize">{userProfile.role?.replace('_', ' ')}</span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
