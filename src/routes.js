const { Router } = require('express');

const EmployeeController = require('./app/controllers/EmployeeController');
const PositionController = require('./app/controllers/PositionController');

const router = Router();

router.get('/employees', EmployeeController.index);
router.get('/employees/:id', EmployeeController.show);
router.delete('/employees/:id', EmployeeController.delete);
router.post('/employees', EmployeeController.store);
router.put('/employees/:id', EmployeeController.update);

router.get('/positions', PositionController.index);
router.post('/positions', PositionController.store);

module.exports = router;
