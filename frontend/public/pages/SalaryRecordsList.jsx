import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { Link } from 'react-router-dom';

const SalaryRecordsList = () => {
  const { salaries, fetchSalaries, deleteSalaryRecord, loading } = useGlobalState();

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  const handleDelete = (id) => {
    deleteSalaryRecord(id);
  };

  return (
    <div>
      <h1>Salary Records</h1>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Salary</th>
            <th>Paid Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary._id}>
              <td>{salary.employeeName}</td>
              <td>{salary.amount}</td>
              <td>{salary.paid ? 'Paid' : 'Pending'}</td>
              <td>
                <Link to={`/salary/${salary._id}`}>Edit</Link>
                <button onClick={() => handleDelete(salary._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryRecordsList;
