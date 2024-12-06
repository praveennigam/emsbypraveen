import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const {
    fetchEmployees,
    fetchHelpdeskTickets,
    fetchHolidays,
    fetchSalaries,
    fetchTimeEntries,
    fetchLeaves,
    employees,
    helpdeskTickets,
    holidays,
    salaries,
    timeEntries,
    leaves,
  } = useGlobalState();

  useEffect(() => {
    // Fetch data when the component mounts
    fetchEmployees();
    fetchHelpdeskTickets();
    fetchHolidays();
    fetchSalaries();
    fetchTimeEntries();
    fetchLeaves();
  }, []);

  // Helper function to safely check if data is an array before mapping
  const renderList = (data, renderItem) => {
    if (!Array.isArray(data)) {
      return <p>No data available.</p>;
    }
    return data.map(renderItem);
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Employees Section */}
      <div>
        <h3>Employees</h3>
        <ul>
          {renderList(employees, (employee) => (
            <li key={employee._id}>{employee.name}</li>
          ))}
        </ul>
        <Link to="/employees">View All Employees</Link>
      </div>

      {/* Help Desk Tickets Section */}
      <div>
        <h3>Help Desk Tickets</h3>
        <ul>
          {renderList(helpdeskTickets, (ticket) => (
            <li key={ticket._id}>{ticket.description}</li>
          ))}
        </ul>
        <Link to="/helpdesk">View All Tickets</Link>
      </div>

      {/* Holidays Section */}
      <div>
        <h3>Holidays</h3>
        <ul>
          {renderList(holidays, (holiday) => (
            <li key={holiday._id}>{holiday.name}</li>
          ))}
        </ul>
        <Link to="/holidays">View All Holidays</Link>
      </div>

      {/* Salaries Section */}
      <div>
        <h3>Salaries</h3>
        <ul>
          {renderList(salaries, (salary) => (
            <li key={salary._id}>{salary.employeeName}: {salary.amount}</li>
          ))}
        </ul>
        <Link to="/salary">View All Salaries</Link>
      </div>

      {/* Time Entries Section */}
      <div>
        <h3>Time Entries</h3>
        <ul>
          {renderList(timeEntries, (timeEntry) => (
            <li key={timeEntry._id}>{timeEntry.description}</li>
          ))}
        </ul>
        <Link to="/timeentry">View All Time Entries</Link>
      </div>

      {/* Leaves Section */}
      <div>
        <h3>Leaves</h3>
        <ul>
          {renderList(leaves, (leave) => (
            <li key={leave._id}>{leave.employeeName}: {leave.leaveType}</li>
          ))}
        </ul>
        <Link to="/leave">View All Leaves</Link>
      </div>

    </div>
  );
};

export default Dashboard;
