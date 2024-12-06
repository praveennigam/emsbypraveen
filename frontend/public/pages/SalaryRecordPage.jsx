import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useNavigate, useParams } from 'react-router-dom';

const SalaryRecordPage = () => {
  const { id } = useParams();
  const { salaries, createSalaryRecord, incrementSalary, markSalaryAsPaid, fetchSalaries } = useGlobalState();
  const [salaryData, setSalaryData] = useState({ employeeId: '', amount: '', paid: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const salary = salaries.find((s) => s._id === id);
      if (salary) {
        setSalaryData({ employeeId: salary.employeeId, amount: salary.amount, paid: salary.paid });
      }
    }
  }, [id, salaries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      incrementSalary(id, salaryData).then(() => navigate('/salaries'));
    } else {
      createSalaryRecord(salaryData).then(() => navigate('/salaries'));
    }
  };

  const handleMarkAsPaid = () => {
    markSalaryAsPaid(id, { paid: true }).then(() => navigate('/salaries'));
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Create'} Salary Record</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={salaryData.amount}
          onChange={(e) => setSalaryData({ ...salaryData, amount: e.target.value })}
        />
        <select
          value={salaryData.paid}
          onChange={(e) => setSalaryData({ ...salaryData, paid: e.target.value === 'true' })}
        >
          <option value={false}>Pending</option>
          <option value={true}>Paid</option>
        </select>
        <button type="submit">{id ? 'Update' : 'Create'} Salary Record</button>
      </form>

      {id && !salaryData.paid && (
        <div>
          <button onClick={handleMarkAsPaid}>Mark as Paid</button>
        </div>
      )}
    </div>
  );
};

export default SalaryRecordPage;
