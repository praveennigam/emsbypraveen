const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/signup', employeeController.signup);
router.post('/login', employeeController.login);

router.post('/employees', authMiddleware, roleMiddleware(['admin', 'hr']), upload.single('image'), employeeController.createEmployee);
router.get('/employees', authMiddleware, roleMiddleware(['admin', 'manager', 'hr']), employeeController.getAllEmployees);

router.get('/employees/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'hr', 'employee']), employeeController.getEmployeeById);
router.put('/employees/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'hr', 'employee']), upload.single('image'), employeeController.updateEmployee);

router.delete('/employees/:id', authMiddleware, roleMiddleware(['admin', 'hr']), employeeController.deleteEmployee);

router.put('/employees/:emp_id/assign-manager', authMiddleware, roleMiddleware(['admin', 'hr']), employeeController.assignManagerToEmployee);
router.get('/employees/:emp_id/juniors', authMiddleware, roleMiddleware(['admin', 'manager']), employeeController.getManagedEmployees);

router.get('/me', authMiddleware, employeeController.getMyDetails);
router.put('/approve-reject/:id', authMiddleware, roleMiddleware(['admin', 'hr']), employeeController.approveRejectEmployee);
router.put('/profile', authMiddleware, employeeController.updateProfile);

module.exports = router;












// const express = require('express');
// const router = express.Router();
// const employeeController = require('../controllers/employeeController');
// const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// router.post('/signup', employeeController.signup);
// router.post('/login', employeeController.login);

// router.post('/employees', authMiddleware, roleMiddleware(['admin', 'hr']), upload.single('image'), employeeController.createEmployee);
// router.get('/employees', authMiddleware, roleMiddleware(['admin', 'manager', 'hr']), employeeController.getAllEmployees);

// router.get('/employees/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'hr', 'employee']), employeeController.getEmployeeById);
// router.put('/employees/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'hr', 'employee']), upload.single('image'), employeeController.updateEmployee);

// router.delete('/employees/:id', authMiddleware, roleMiddleware(['admin', 'hr']), employeeController.deleteEmployee);

// router.put('/employees/:emp_id/assign-manager', authMiddleware, roleMiddleware(['admin', 'hr']), employeeController.assignManagerToEmployee);
// router.get('/employees/:emp_id/juniors', authMiddleware, roleMiddleware(['admin', 'manager']), employeeController.getManagedEmployees);


// router.get('/me', authMiddleware, employeeController.getMyDetails);






// module.exports = router;
