// Events.js
import React, { useEffect, useState } from "react";
import { db, Users } from "../db"; // Adjust the path

const UsersComponent = async () => {
  let users = await db.select().from(Users);

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">All Users</h2>
          <p className="text-sm text-gray-500">Total Users: {users.length}</p>
        </div>
      </div>
      <div className="divide-y divide-gray-900/5">
        {users.map((user) => (
          <div
            key={user.user_id}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <p className="font-medium leading-none">{user.username}</p>
              <p className="text-sm text-gray-500">{user.google_account_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersComponent;
