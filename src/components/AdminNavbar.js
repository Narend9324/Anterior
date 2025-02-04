const AdminNavbar = ({ isCollapsed }) => {
  return (
    <nav
      className={`bg-white shadow-md h-16 flex items-center justify-end px-4 fixed top-0 transition-all rounded-md m-4 duration-300 ${
        isCollapsed ? 'left-20' : 'left-64'
      } right-0`}
    >
      {/* Right Side: Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Placeholder */}
        <button className="relative">
          {/* You can place your SVG here */}
        </button>

        {/* Profile Picture */}
        <img
          src="{/profile.jpg}" // Replace with actual profile image
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </nav>
  );
};

export default AdminNavbar;
