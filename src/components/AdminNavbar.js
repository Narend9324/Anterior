const AdminNavbar = ({ isCollapsed }) => {
  return (
    <nav
      className={`bg-white shadow-md h-16 flex items-center justify-end fixed top-0 transition-all rounded-md px-4 mx-6 mt-4 duration-300 ${
        isCollapsed ? 'left-20' : 'left-64'
      } right-0`}
    >
      {/* Right Side: Profile */}
      <div className="flex items-center">
      <img
          src="/Notification.svg"
          alt="Profile"
          className="h-6 w-6 rounded-full"
        />
        <button className="relative">
          {/* You can place your SVG here */}
        </button>

        {/* Profile Picture */}
        <img
          src="/pics/Rectangle16.png" // Replace with actual profile image
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </nav>
  );
};

export default AdminNavbar;
