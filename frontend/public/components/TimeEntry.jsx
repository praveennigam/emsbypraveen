import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const TimeEntry = () => {
  const { fetchTimeEntries, timeEntries } = useGlobalState();
  const [clockIn, setClockIn] = useState(false);
  const [lunchBreak, setLunchBreak] = useState(false);

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  const handleClockIn = () => {
    setClockIn(!clockIn);
    // Make API call to clock in
  };

  const handleLunchBreak = () => {
    setLunchBreak(!lunchBreak);
    // Make API call to mark lunch break
  };

  return (
    <div>
      <h2>Time Entries</h2>
      <button onClick={handleClockIn}>
        {clockIn ? 'Clock Out' : 'Clock In'}
      </button>
      <button onClick={handleLunchBreak}>
        {lunchBreak ? 'End Lunch' : 'Start Lunch Break'}
      </button>
      <ul>
        {timeEntries.map((entry) => (
          <li key={entry._id}>
            {entry.employeeName} - {entry.hoursWorked} hours
            {/* Add actions to update or delete entries */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeEntry;
