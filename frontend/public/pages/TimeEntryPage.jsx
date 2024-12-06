import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useNavigate, useParams } from 'react-router-dom';

const TimeEntryPage = () => {
  const { id } = useParams();
  const { timeEntries, createTimeEntry, updateTimeEntry, fetchTimeEntries } = useGlobalState();
  const [timeEntryData, setTimeEntryData] = useState({
    employeeId: '',
    clockIn: '',
    clockOut: '',
    lunchBreak: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const timeEntry = timeEntries.find((t) => t._id === id);
      if (timeEntry) {
        setTimeEntryData({
          employeeId: timeEntry.employeeId,
          clockIn: timeEntry.clockIn,
          clockOut: timeEntry.clockOut,
          lunchBreak: timeEntry.lunchBreak
        });
      }
    }
  }, [id, timeEntries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateTimeEntry(id, timeEntryData).then(() => navigate('/time-entries'));
    } else {
      createTimeEntry(timeEntryData).then(() => navigate('/time-entries'));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Create'} Time Entry</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={timeEntryData.clockIn}
          onChange={(e) => setTimeEntryData({ ...timeEntryData, clockIn: e.target.value })}
        />
        <input
          type="datetime-local"
          value={timeEntryData.clockOut}
          onChange={(e) => setTimeEntryData({ ...timeEntryData, clockOut: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lunch Break (hours)"
          value={timeEntryData.lunchBreak}
          onChange={(e) => setTimeEntryData({ ...timeEntryData, lunchBreak: e.target.value })}
        />
        <button type="submit">{id ? 'Update' : 'Create'} Time Entry</button>
      </form>
    </div>
  );
};

export default TimeEntryPage;
