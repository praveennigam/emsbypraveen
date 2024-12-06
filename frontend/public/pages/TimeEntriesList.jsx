import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { Link } from 'react-router-dom';

const TimeEntriesList = () => {
  const { timeEntries, fetchTimeEntries, deleteTimeEntry, loading } = useGlobalState();

  useEffect(() => {
    fetchTimeEntries();
  }, [fetchTimeEntries]);

  const handleDelete = (id) => {
    deleteTimeEntry(id);
  };

  return (
    <div>
      <h1>Time Entries</h1>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Lunch Break</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timeEntries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.employeeName}</td>
              <td>{entry.clockIn}</td>
              <td>{entry.clockOut}</td>
              <td>{entry.lunchBreak}</td>
              <td>
                <Link to={`/time-entry/${entry._id}`}>Edit</Link>
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeEntriesList;
