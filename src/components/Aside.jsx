import { NavLink } from "react-router-dom";
import { 
  FaChartPie, 
  FaUsers, 
  FaHome, 
  FaCreditCard, 
  FaUniversity, 
  FaSignOutAlt 
} from "react-icons/fa";


const Aside = () => {
    return (
        <div className="flex flex-col h-screen p-3 bg-slate-900 text-white w-64 shadow-xl">
      <div className="space-y-3">
        <div className="flex items-center p-2 mb-6">
          <h2 className="text-2xl font-bold text-blue-400">ClubSphere</h2>
        </div>
        
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-2 text-sm">
            {/* Admin Overview */}
            <li className="rounded-sm">
              <NavLink 
                to="/dashboard/admin/overview" 
                className={({ isActive }) => 
                  `flex items-center p-3 space-x-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`
                }
              >
                <FaChartPie className="w-5 h-5" />
                <span className="font-semibold">Admin Overview</span>
              </NavLink>
            </li>

            {/* Manage Users */}
            <li className="rounded-sm">
              <NavLink 
                to="/dashboard/admin/manage-users" 
                className={({ isActive }) => 
                  `flex items-center p-3 space-x-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`
                }
              >
                <FaUsers className="w-5 h-5" />
                <span className="font-semibold">Manage Users</span>
              </NavLink>
            </li>

            {/* Manage Clubs */}
            <li className="rounded-sm">
              <NavLink 
                to="/dashboard/manageclubs" 
                className={({ isActive }) => 
                  `flex items-center p-3 space-x-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`
                }
              >
                <FaUniversity className="w-5 h-5" />
                <span className="font-semibold">Manage Clubs</span>
              </NavLink>
            </li>

            {/* add Clubs */}
            <li className="rounded-sm">
              <NavLink 
                to="/dashboard/add-clubs" 
                className={({ isActive }) => 
                  `flex items-center p-3 space-x-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`
                }
              >
                <FaUniversity className="w-5 h-5" />
                <span className="font-semibold">Add Club</span>
              </NavLink>
            </li>
            

            {/* Payments/Transactions */}
            <li className="rounded-sm">
              <NavLink 
                to="/dashboard/admin/payments" 
                className={({ isActive }) => 
                  `flex items-center p-3 space-x-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`
                }
              >
                <FaCreditCard className="w-5 h-5" />
                <span className="font-semibold">Transactions</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Shared/Public Routes */}
      <div className="pt-4 mt-auto border-t border-slate-700">
        <ul className="space-y-2 text-sm">
          <li>
            <NavLink to="/" className="flex items-center p-3 space-x-3 hover:bg-slate-800 rounded-md">
              <FaHome className="w-5 h-5" />
              <span>Go to Home</span>
            </NavLink>
          </li>
          <li>
            <button className="flex items-center w-full p-3 space-x-3 text-red-400 hover:bg-red-900/20 rounded-md transition-colors">
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    );
};

export default Aside;




