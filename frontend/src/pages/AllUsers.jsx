import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaBan, FaUnlock, FaSearch } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // ✅ FIXED

      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      });

      setUsers(res.data);
      setLoading(false);
      setError("");
    } catch (err) {
      setLoading(false);
      setError("Unable to load users. Unauthorized or server offline.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token"); // ✅ FIXED

      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ FIXED
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Block / Unblock
  const toggleBlock = async (id, blocked) => {
    try {
      const token = localStorage.getItem("token"); // ✅ FIXED

      await axios.put(
        `http://localhost:5000/api/admin/users/block/${id}`,
        { blocked: !blocked },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ FIXED
        }
      );

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Search filter
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container-fluid">

      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">All Users</h2>

        {/* Search Input */}
        <div className="input-group" style={{ width: "300px" }}>
          <span className="input-group-text bg-dark text-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="card shadow-sm p-3">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-3">
                      No users found
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>

                      <td>
                        {user.blocked ? (
                          <span className="badge bg-danger">Blocked</span>
                        ) : (
                          <span className="badge bg-success">Active</span>
                        )}
                      </td>

                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                      <td>
                        {/* Block / Unblock */}
                        <button
                          className={`btn btn-sm me-2 ${
                            user.blocked ? "btn-success" : "btn-warning"
                          }`}
                          onClick={() => toggleBlock(user._id, user.blocked)}
                        >
                          {user.blocked ? <FaUnlock /> : <FaBan />}
                        </button>

                        {/* Delete */}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
