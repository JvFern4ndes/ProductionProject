const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const PositionController = require('./app/controllers/PositionController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.delete);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

router.get('/positions', PositionController.index);
router.post('/positions', PositionController.store);

module.exports = router;
