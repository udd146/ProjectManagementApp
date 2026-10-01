
const Header = ({ onLogout,user }) => {
    
    return (
      <header className="h-16 bg-blue-600 text-white flex items-center justify-between px-6 shadow-md">
        <h1 className="text-xl font-bold">
          Project Management App
        </h1>
        <div>
        <text className="px-4">{`Welcome !! ${user?.name}`}</text>
        <button
          onClick={onLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Logout
        </button>
        </div>
        
      </header>
    );
  };
  
  export default Header;