import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../features/auth/authSlice";
import Loader from "../components/Loader";
function UsersList() {
  const { users, user, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers(user));
  }, [dispatch]);
  const updateUserHandler = (id) => {
    dispatch(updateUser({ user, id }));
    dispatch(getAllUsers(user));
  };
  const deleteUserHandler = (id) => {
    const qs = window.confirm("Are you sure you want to delete this user? ");
    if (qs) {
      dispatch(deleteUser({ user, id }));
    }
    dispatch(getAllUsers(user));
  };
  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-10">
          <h2>All Users</h2>
        </div>
      </div>
      {status === "laoding" ? (
        <Loader />
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Phone </th>
              <th>Address</th>
              <th>Date of join</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.date_joined.substring(0, 10)}</td>
                <td>
                  {user?.isAdmin ? (
                    <p className="badge bg-primary">Admin</p>
                  ) : (
                    <p className="badge bg-warning">Not Admin</p>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => updateUserHandler(user.id)}
                    className="btn btn-outline-success"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUserHandler(user.id)}
                    className="btn btn-outline-danger mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;
