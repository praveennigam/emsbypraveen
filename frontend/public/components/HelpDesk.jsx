import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

const HelpDesk = () => {
  const { fetchHelpdeskTickets, helpdeskTickets } = useGlobalState();
  const [newTicket, setNewTicket] = useState('');

  useEffect(() => {
    fetchHelpdeskTickets();
  }, []);

  const handleCreateTicket = () => {
    // Logic to create a ticket
    // Example: API call to create the ticket (use your backend route)
    // Update the context with the new ticket
  };

  return (
    <div>
      <h2>Help Desk Tickets</h2>
      <textarea
        value={newTicket}
        onChange={(e) => setNewTicket(e.target.value)}
        placeholder="Describe the issue..."
      />
      <button onClick={handleCreateTicket}>Create Ticket</button>
      <ul>
        {helpdeskTickets.map((ticket) => (
          <li key={ticket._id}>
            {ticket.description}
            {/* You can add update/delete actions here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HelpDesk;
