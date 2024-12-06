import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { Link } from 'react-router-dom';

const LeaveRequestsList = () => {
  const { leaves, fetchLeaves, deleteLeaveRequest, loading } = useGlobalState();

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleDelete = (id) => {
    deleteLeaveRequest(id);
  };

  return (
    <div>
      <h1>Leave Requests</h1>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employeeName}</td>
              <td>{leave.date}</td>
              <td>{leave.status}</td>
              <td>
                <Link to={`/leave/${leave._id}`}>Edit</Link>
                <button onClick={() => handleDelete(leave._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestsList;
