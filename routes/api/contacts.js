const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation } = require('../../middlewares');
const { joiSchema, statusJoiSchema } = require('../../models/contact');

const validateMiddleware = validation(joiSchema);
const validateFavoriteMiddleware = validation(statusJoiSchema);

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateMiddleware, ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validateMiddleware, ctrl.updateById);

router.patch(
  '/:contactId/favorite',
  validateFavoriteMiddleware,
  ctrl.updateStatus
);

module.exports = router;
