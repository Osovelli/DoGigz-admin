import { Outlet, NavLink } from 'react-router-dom';

const SettingsLayout = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Website Settings</h1>
        <p className="text-gray-600">Manage all transaction records</p>
      </div>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {/* <NavLink 
            to="/settings/all-gigs"
            className={({ isActive }) => 
              `pb-4 px-1 ${isActive 
                ? 'border-b-2 border-black text-black font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            All Gigs
          </NavLink> */}
          <NavLink 
            to="/dashboard/settings/privacy"
            className={({ isActive }) => 
              `pb-4 px-1 ${isActive 
                ? 'border-b-2 border-black text-black font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink 
            to="/dashboard/settings/faq"
            className={({ isActive }) => 
              `pb-4 px-1 ${isActive 
                ? 'border-b-2 border-black text-black font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            FAQ
          </NavLink>
          <NavLink 
            to="/dashboard/settings/newsletter"
            className={({ isActive }) => 
              `pb-4 px-1 ${isActive 
                ? 'border-b-2 border-black text-black font-medium' 
                : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            Newsletter
          </NavLink>
        </nav>
      </div>
      
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;