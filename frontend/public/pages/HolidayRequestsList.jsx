import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { Link } from 'react-router-dom';

const HolidayRequestsList = () => {
  const { holidays, fetchHolidays, deleteHolidayRequest, loading } = useGlobalState();

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleDelete = (id) => {
    deleteHolidayRequest(id);
  };

  return (
    <div>
      <h1>Holiday Requests</h1>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Holiday Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday) => (
            <tr key={holiday._id}>
              <td>{holiday.employeeName}</td>
              <td>{holiday.date}</td>
              <td>{holiday.status}</td>
              <td>
                <Link to={`/holiday/${holiday._id}`}>Edit</Link>
                <button onClick={() => handleDelete(holiday._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayRequestsList;
