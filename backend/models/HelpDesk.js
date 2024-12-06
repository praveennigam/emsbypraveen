// models/HelpDesk.js
const mongoose = require('mongoose');

const helpDeskSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },  // Employee ID
  ticketId: { type: String, unique: true, required: true },  // Ticket ID
  issue: { type: String, required: true },  // Issue reported by the employee
  description: { type: String },  // Detailed description of the issue
  status: { type: String, enum: ['open', 'closed', 'in-progress'], default: 'open' },  // Status of the ticket
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },  // Priority of the issue
  createdAt: { type: Date, default: Date.now },  // Issue creation date
  updatedAt: { type: Date, default: Date.now },  // Last update date
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },  // Employee who resolved the issue
});

const HelpDesk = mongoose.model('HelpDesk', helpDeskSchema);

module.exports = HelpDesk;
