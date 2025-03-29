import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditedUser(user);
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editUserId ? editedUser : user))
    );
    setEditUserId(null);
  };

  const handleCancel = () => {
    setEditUserId(null);
    setEditedUser({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">User Directory</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Avatar</th>
              <th className="py-2 px-4 border">First Name</th>
              <th className="py-2 px-4 border">Last Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      name="first_name"
                      value={editedUser.first_name}
                      onChange={handleChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    user.first_name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      name="last_name"
                      value={editedUser.last_name}
                      onChange={handleChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    user.last_name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {editUserId === user.id ? (
                    <>
                      <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">
                        Save
                      </button>
                      <button onClick={handleCancel} className="bg-gray-500 text-white px-2 py-1 rounded">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;