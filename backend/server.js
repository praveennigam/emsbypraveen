const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employee');
const helpDeskRoutes = require('./routes/helpDesk');
const holidayRoutes = require('./routes/holidays');
const salaryRoutes = require('./routes/salary');
const timeEntryRoutes = require('./routes/timeEntry');
const leaveRoutes = require('./routes/leave');
const path = require('path');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'empdata'));


app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/create-employee', (req, res) => {
  res.render('create-employee');
});

app.get('/all-employees', (req, res) => {
  res.render('all-employees');
});

app.get('/employee-details/:id', (req, res) => {
  res.render('employee-details', { employeeId: req.params.id });
});

app.get('/update-employee/:id', (req, res) => {
  res.render('update-employee', { employeeId: req.params.id });
});

app.get('/delete-employee/:id', (req, res) => {
  res.render('delete-employee', { employeeId: req.params.id });
});

app.get('/assign-manager/:id', (req, res) => {
  res.render('assign-manager', { employeeId: req.params.id });
});

app.get('/manage-juniors', (req, res) => {
  res.render('manage-juniors');
});

app.get('/my-profile', (req, res) => {
  res.render('my-profile');
});

app.get('/update-profile', (req, res) => {
  res.render('update-profile');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

connectDB();

app.use('/api/emp', employeeRoutes);
app.use('/api/helpdesk', helpDeskRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/timeEntries', timeEntryRoutes);
app.use('/api/leaves', leaveRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Employee Management API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});









// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');  // Import the database connection function

// // Import routes
// const employeeRoutes = require('./routes/employee');
// const helpDeskRoutes = require('./routes/helpDesk');
// const holidayRoutes = require('./routes/holidays');
// const salaryRoutes = require('./routes/salary');
// const timeEntryRoutes = require('./routes/timeEntry');
// const leaveRoutes = require('./routes/leave');

// // Load environment variables
// dotenv.config();

// // Initialize express app
// const app = express();


// // Middleware to parse JSON requests
// app.use(express.json());

// // CORS middleware to handle cross-origin requests
// const allowedOrigins = ['http://localhost:5173']; // Replace with your frontend URLs (no trailing slashes)
// app.use(cors({
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {  // Allow all local and specific frontend domains
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));

// // Connect to MongoDB
// connectDB();  // Call the database connection function

// // API routes
// app.use('/api/emp', employeeRoutes);    // Employee related routes
// app.use('/api/helpdesk', helpDeskRoutes);     // Helpdesk related routes
// app.use('/api/holidays', holidayRoutes);     // Holiday related routes
// app.use('/api/salaries', salaryRoutes);       // Salary related routes
// app.use('/api/timeEntries', timeEntryRoutes); // Time entry related routes
// app.use('/api/leaves', leaveRoutes);          // Leave related routes

// // Basic root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Employee Management API');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
