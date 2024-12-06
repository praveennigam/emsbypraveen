import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const Leave = () => {
  const { fetchLeaves, leaves } = useGlobalState();

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div>
      <h2>Leave Requests</h2>
      <ul>
        {leaves.map((leave) => (
          <li key={leave._id}>
            {leave.employeeName} - {leave.status}
            {/* Add logic for approving or rejecting leave requests */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leave;
