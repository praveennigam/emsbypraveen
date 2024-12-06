import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useNavigate, useParams } from 'react-router-dom';

const LeaveRequestPage = () => {
  const { id } = useParams();
  const { leaves, createLeaveRequest, updateLeaveStatus, fetchLeaves } = useGlobalState();
  const [leaveData, setLeaveData] = useState({ employeeId: '', date: '', status: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const leave = leaves.find((l) => l._id === id);
      if (leave) {
        setLeaveData({ employeeId: leave.employeeId, date: leave.date, status: leave.status });
      }
    }
  }, [id, leaves]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateLeaveStatus(id, leaveData).then(() => navigate('/leaves'));
    } else {
      createLeaveRequest(leaveData).then(() => navigate('/leaves'));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Create'} Leave Request</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={leaveData.date}
          onChange={(e) => setLeaveData({ ...leaveData, date: e.target.value })}
        />
        <select
          value={leaveData.status}
          onChange={(e) => setLeaveData({ ...leaveData, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit">{id ? 'Update' : 'Create'} Leave Request</button>
      </form>
    </div>
  );
};

export default LeaveRequestPage;
