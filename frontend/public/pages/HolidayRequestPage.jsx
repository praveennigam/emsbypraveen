import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useNavigate, useParams } from 'react-router-dom';

const HolidayRequestPage = () => {
  const { id } = useParams();
  const { holidays, createHolidayRequest, updateHolidayStatus, fetchHolidays } = useGlobalState();
  const [holidayData, setHolidayData] = useState({ employeeId: '', date: '', status: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const holiday = holidays.find((h) => h._id === id);
      if (holiday) {
        setHolidayData({ employeeId: holiday.employeeId, date: holiday.date, status: holiday.status });
      }
    }
  }, [id, holidays]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateHolidayStatus(id, holidayData).then(() => navigate('/holidays'));
    } else {
      createHolidayRequest(holidayData).then(() => navigate('/holidays'));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Create'} Holiday Request</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={holidayData.date}
          onChange={(e) => setHolidayData({ ...holidayData, date: e.target.value })}
        />
        <select
          value={holidayData.status}
          onChange={(e) => setHolidayData({ ...holidayData, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit">{id ? 'Update' : 'Create'} Holiday Request</button>
      </form>
    </div>
  );
};

export default HolidayRequestPage;
