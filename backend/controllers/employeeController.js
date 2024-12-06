const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Generate Offer Letter PDF
const generateOfferLetter = async (offerDetails, filePath) => {
  const pdfDocument = new PDFDocument();
  pdfDocument.pipe(fs.createWriteStream(filePath));
  pdfDocument.fontSize(12).text(`Offer Letter for ${offerDetails.name}`, { align: 'center' });
  pdfDocument.text(`Position: ${offerDetails.position}`);
  pdfDocument.text(`Salary: ${offerDetails.salary}`);
  pdfDocument.text(`Start Date: ${offerDetails.startDate}`);
  pdfDocument.end();
};

// Send Offer Letter via Email
const sendOfferLetter = async (email, offerDetails) => {
  try {
    const offerLetterPath = path.join(__dirname, 'uploads', `offer_letter_${offerDetails.name}.pdf`);
    await generateOfferLetter(offerDetails, offerLetterPath);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Offer Letter - Congratulations!',
      text: `Dear ${offerDetails.name},\n\nCongratulations on your approval! Please find attached your offer letter.`,
      attachments: [
        {
          filename: path.basename(offerLetterPath),
          path: offerLetterPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Offer letter sent successfully.');
    fs.unlinkSync(offerLetterPath);
  } catch (error) {
    console.error('Error sending offer letter: ', error);
  }
};

// Signup Logic
const signup = async (req, res) => {
  const { name, email, password, role, department, contactNumber, address, dateOfBirth } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set approval status based on role
    const approvalStatus = role === 'admin' ? 'approved' : 'pending';

    const employee = new Employee({
      name,
      email,
      password: hashedPassword,
      role,
      department,
      contactNumber,
      address,
      dateOfBirth,
      approvalStatus,
    });

    await employee.save();

    // Generate token
    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Employee created successfully', token, id: employee._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Login Logic
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const approvalStatus = employee.approvalStatus === 'approved' ? 'approved' : 'pending';

    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      id: employee._id,
      role: employee.role,
      approvalStatus,
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create New Employee
const createEmployee = async (req, res) => {
  const { email, password, role } = req.body;
  const image = req.file ? req.file.path : undefined;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const name = email.split('@')[0];

    const employee = new Employee({ email, password: hashedPassword, role, name, image });
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Employee Details
const updateEmployee = async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) updatedData.image = req.file.path;
    const employee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign Manager to Employee
const assignManagerToEmployee = async (req, res) => {
  try {
    const { managerId } = req.body;
    const employee = await Employee.findById(req.params.emp_id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.manager = managerId;
    await employee.save();
    res.status(200).json({ message: 'Manager assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Managed Employees
const getManagedEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ manager: req.params.emp_id });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Details
const getMyDetails = (req, res) => {
  res.status(200).json(req.user);
};

// Approve or Reject Employee
const approveRejectEmployee = async (req, res) => {
  const { status } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (employee.role === 'admin') {
      employee.approvalStatus = 'approved';
      await employee.save();
      return res.status(200).json({ message: 'Admin approved automatically.' });
    }

    employee.approvalStatus = status === 'approved' ? 'approved' : 'rejected';
    await employee.save();

    if (status === 'approved') {
      sendOfferLetter(employee.email, employee);
    }

    res.status(200).json({ message: `Employee ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile (Password, Email, Image)
const updateProfile = async (req, res) => {
  const { email, password } = req.body;
  const image = req.file ? req.file.path : undefined;

  try {
    const employee = await Employee.findById(req.user._id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      employee.password = hashedPassword;
    }

    if (email) employee.email = email;
    if (image) employee.image = image;

    await employee.save();
    res.status(200).json({ message: 'Profile updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  assignManagerToEmployee,
  getManagedEmployees,
  getMyDetails,
  approveRejectEmployee,
  updateProfile
};








// const Employee = require('../models/Employee');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   const { name, email, password, role, department, contactNumber, address } = req.body;
//   try {
//     const existingEmployee = await Employee.findOne({ email });
//     if (existingEmployee) {
//       return res.status(400).json({ message: 'Employee already exists' });
//     }
//     const newEmployee = new Employee({ name, email, password, role, department, contactNumber, address });
//     await newEmployee.save();
//     res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating employee', error });
//   }
// };




// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const employee = await Employee.findOne({ email });
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     const isMatch = await employee.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       employee: { name: employee.name, email: employee.email, role: employee.role, empId: employee.empId }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// exports.createEmployee = async (req, res) => {
//   const { name, email, password, role, department, contactNumber, address } = req.body;
//   try {
//     const newEmployee = new Employee({
//       name,
//       email,
//       password,
//       role,
//       department,
//       contactNumber,
//       address,
//       image: req.file ? req.file.path : null
//     });
//     await newEmployee.save();
//     res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating employee', error });
//   }
// };

// exports.getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching employees', error });
//   }
// };

// exports.getEmployeeById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const employee = await Employee.findById(id).populate('manager', 'name');
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching employee details', error });
//   }
// };

// exports.getMyDetails = async (req, res) => {
//   try {
//     const user = req.user; // The user is set by the authMiddleware
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user); // Send back the user details
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user details', error });
//   }
// };



// exports.updateEmployee = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password, role, department, contactNumber, address } = req.body;
//   try {
//     const employee = await Employee.findById(id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     if (req.user._id.toString() === id) {
//       if (name) employee.name = name;
//       if (email) employee.email = email;
//       if (password) employee.password = password;
//       if (department) employee.department = department;
//       if (contactNumber) employee.contactNumber = contactNumber;
//       if (address) employee.address = address;
//       if (req.file) employee.image = req.file.path;
//     } else if (['admin', 'manager', 'hr'].includes(req.user.role)) {
//       if (name) employee.name = name;
//       if (email) employee.email = email;
//       if (password) employee.password = password;
//       if (department) employee.department = department;
//       if (contactNumber) employee.contactNumber = contactNumber;
//       if (address) employee.address = address;
//       if (req.file) employee.image = req.file.path;
//     } else {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     await employee.save();
//     res.status(200).json({ message: 'Employee updated successfully', employee });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating employee', error });
//   }
// };

// exports.deleteEmployee = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const employee = await Employee.findById(id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     if (['admin', 'hr'].includes(req.user.role) || req.user._id.toString() === id) {
//       await employee.remove();
//       res.status(200).json({ message: 'Employee deleted successfully' });
//     } else {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting employee', error });
//   }
// };

// exports.assignManagerToEmployee = async (req, res) => {
//   const { emp_id } = req.params;
//   const { managerId } = req.body;

//   try {
//     const employee = await Employee.findById(emp_id);
//     const manager = await Employee.findById(managerId);

//     if (!employee || !manager) {
//       return res.status(404).json({ message: 'Employee or Manager not found' });
//     }

//     employee.manager = manager._id;
//     employee.managerName = manager.name;
//     await employee.save();

//     res.status(200).json({ message: 'Manager assigned successfully', employee });
//   } catch (error) {
//     res.status(500).json({ message: 'Error assigning manager', error });
//   }
// };

// exports.getManagedEmployees = async (req, res) => {
//   const { emp_id } = req.params;

//   try {
//     const manager = await Employee.findById(emp_id);

//     if (!manager) {
//       return res.status(404).json({ message: 'Manager not found' });
//     }

//     const employees = await Employee.find({ manager: manager._id });
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching managed employees', error });
//   }
// };
