const HelpDesk = require('../models/HelpDesk');

// Create a new help desk ticket
exports.createTicket = async (req, res) => {
  try {
    const { employeeId, issue, description, priority } = req.body;
    const ticketId = 'TD-' + new Date().getTime(); // Generate a unique ticket ID
    const newTicket = new HelpDesk({ employeeId, ticketId, issue, description, priority });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all help desk tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await HelpDesk.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get help desk ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await HelpDesk.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ticket status (open/closed/in-progress)
exports.updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const validStatuses = ['open', 'closed', 'in-progress'];
    if (!validStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const ticket = await HelpDesk.findOneAndUpdate({ ticketId }, { status, updatedAt: Date.now() }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign an employee to resolve the ticket
exports.assignEmployeeToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { employeeId } = req.body;

    const ticket = await HelpDesk.findOneAndUpdate({ ticketId }, { resolvedBy: employeeId, updatedAt: Date.now() }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tickets by employee ID
exports.getTicketsByEmployee = async (req, res) => {
  try {
    const tickets = await HelpDesk.find({ employeeId: req.params.employeeId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tickets by status (open/closed/in-progress)
exports.getTicketsByStatus = async (req, res) => {
  try {
    const tickets = await HelpDesk.find({ status: req.params.status });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tickets by priority (low/medium/high)
exports.getTicketsByPriority = async (req, res) => {
  try {
    const tickets = await HelpDesk.find({ priority: req.params.priority });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tickets by resolved employee ID
exports.getTicketsByResolvedEmployee = async (req, res) => {
  try {
    const tickets = await HelpDesk.find({ resolvedBy: req.params.employeeId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the description of a ticket
exports.updateTicketDescription = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { description } = req.body;

    const ticket = await HelpDesk.findOneAndUpdate({ ticketId }, { description, updatedAt: Date.now() }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a ticket by ticketId
exports.deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await HelpDesk.findOneAndDelete({ ticketId });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
