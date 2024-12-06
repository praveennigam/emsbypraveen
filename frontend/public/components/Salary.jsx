import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const Salary = () => {
  const { fetchSalaries, salaries } = useGlobalState();

  useEffect(() => {
    fetchSalaries();
  }, []);

  return (
    <div>
      <h2>Salary Records</h2>
      <ul>
        {salaries.map((salary) => (
          <li key={salary._id}>
            {salary.employeeName} - ${salary.amount}
            {/* Add logic for updating and marking salary as paid */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Salary;
