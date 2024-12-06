import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const TicketsList = () => {
  const { helpdeskTickets, fetchHelpdeskTickets, deleteTicket } = useGlobalState();

  useEffect(() => {
    fetchHelpdeskTickets();  // Fetch tickets on page load
  }, [fetchHelpdeskTickets]);

  const handleDelete = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      await deleteTicket(ticketId);
    }
  };

  return (
    <div>
      <h1>Tickets</h1>
      <Link to="/ticket/new">Create New Ticket</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {helpdeskTickets.length === 0 ? (
            <tr>
              <td colSpan="6">No tickets found</td>
            </tr>
          ) : (
            helpdeskTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedTo}</td>
                <td>
                  <Link to={`/ticket/${ticket._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(ticket._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsList;
