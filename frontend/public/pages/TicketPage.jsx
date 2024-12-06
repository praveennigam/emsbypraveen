import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const TicketPage = () => {
  const { id } = useParams(); // Get ticket ID if editing
  const { helpdeskTickets, createTicket, updateTicketStatus } = useGlobalState();
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    priority: 'low',
    status: 'open',
    assignedTo: '',
  });
  const navigate = useNavigate();

  // On page load, if there's an ID in the URL, load the existing ticket
  useEffect(() => {
    if (id) {
      const existingTicket = helpdeskTickets.find((ticket) => ticket._id === id);
      if (existingTicket) {
        setTicketData({
          title: existingTicket.title,
          description: existingTicket.description,
          priority: existingTicket.priority,
          status: existingTicket.status,
          assignedTo: existingTicket.assignedTo,
        });
      }
    }
  }, [id, helpdeskTickets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // If the ID exists, update the ticket status (or other details)
      await updateTicketStatus(id, { ...ticketData, status: 'resolved' });
    } else {
      // Otherwise, create a new ticket
      await createTicket(ticketData);
    }
    navigate('/tickets');  // Redirect to the tickets list page
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Create'} Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={ticketData.title}
            onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={ticketData.description}
            onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            value={ticketData.priority}
            onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            value={ticketData.status}
            onChange={(e) => setTicketData({ ...ticketData, status: e.target.value })}
            required
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div>
          <label>Assigned To (Employee ID)</label>
          <input
            type="text"
            value={ticketData.assignedTo}
            onChange={(e) => setTicketData({ ...ticketData, assignedTo: e.target.value })}
            required
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'} Ticket</button>
      </form>
    </div>
  );
};

export default TicketPage;
