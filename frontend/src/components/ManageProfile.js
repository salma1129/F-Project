import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

function ManageProfile() {
  return (
    <Card className="p-6 bg-gray-900 shadow-xl rounded-xl border border-gray-700">
      <h2 className="text-2xl font-semibold text-blue-400">Manage Profile</h2>
      <p className="text-gray-400 mt-2">Update your personal information here.</p>
      <div className="mt-4 flex flex-col gap-4">
        <input type="text" placeholder="Full Name" className="bg-gray-800 text-white p-3 rounded w-full focus:ring focus:ring-blue-400" />
        <input type="email" placeholder="Email" className="bg-gray-800 text-white p-3 rounded w-full focus:ring focus:ring-blue-400" />
        <Button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Save Changes</Button>
      </div>
    </Card>
  );
}
export default  ManageProfile;