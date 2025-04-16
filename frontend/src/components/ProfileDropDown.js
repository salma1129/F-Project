export default function ProfileDropdown() {
    return (
      <div className="absolute right-0 mt-2 bg-gray-900 p-2 rounded-lg shadow-lg w-40 border border-gray-700">
        <button className="block text-left w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
          Manage Profile
        </button>
        <button className="block text-left w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg">
          Log Out
        </button>
      </div>
    );
  }
  