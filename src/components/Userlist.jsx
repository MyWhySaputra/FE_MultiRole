import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(
      "https://be-multi-role.vercel.app/api/v1/users"
    );
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(
      `https://be-multi-role.vercel.app/api/v1/users/${userId}`
    );
    getUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Users</h1>
      <h2 className="text-lg font-semibold">List of Users</h2>
      <Link
        to="/users/add"
        className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 inline-block"
      >
        Add New
      </Link>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
