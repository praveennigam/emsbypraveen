import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const Holiday = () => {
  const { fetchHolidays, holidays } = useGlobalState();

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <div>
      <h2>Holiday Requests</h2>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday._id}>
            {holiday.employeeName} - {holiday.status}
            {/* Add logic for approving or rejecting requests */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Holiday;
