import { useState } from "react";
import { FaUser, FaChevronDown } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";

export default function TopNav() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 relative">
      <h1 className="text-xl font-semibold text-blue-400">Dashboard</h1>
      <button className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
        <FaUser className="text-white" />
        <FaChevronDown className="text-white" />
      </button>
      {profileMenuOpen && <ProfileDropdown />}
    </div>
  );
}
