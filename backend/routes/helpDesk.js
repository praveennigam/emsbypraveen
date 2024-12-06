const express = require('express');
const router = express.Router();
const helpDeskController = require('../controllers/helpDeskController');

// Create a new help desk ticket
router.post('/', helpDeskController.createTicket);

// Get all help desk tickets
router.get('/', helpDeskController.getAllTickets);

// Get help desk ticket by ID
router.get('/:id', helpDeskController.getTicketById);

// Update ticket status (open/closed/in-progress)
router.put('/:ticketId/status', helpDeskController.updateTicketStatus);

// Assign an employee to resolve the ticket
router.put('/:ticketId/assign', helpDeskController.assignEmployeeToTicket);

// Get tickets by employee ID
router.get('/employee/:employeeId', helpDeskController.getTicketsByEmployee);

// Get tickets by status
router.get('/status/:status', helpDeskController.getTicketsByStatus);

// Get tickets by priority
router.get('/priority/:priority', helpDeskController.getTicketsByPriority);

// Get tickets by resolved employee ID
router.get('/resolvedBy/:employeeId', helpDeskController.getTicketsByResolvedEmployee);

// Update the description of a ticket
router.put('/:ticketId/description', helpDeskController.updateTicketDescription);

// Delete a ticket by ticketId
router.delete('/:ticketId', helpDeskController.deleteTicket);

module.exports = router;
