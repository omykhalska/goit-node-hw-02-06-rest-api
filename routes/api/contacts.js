const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { schemaValidation, idValidation } = require('../../middlewares');
const { joiContactSchema, statusJoiSchema } = require('../../models/contact');

const validateIdMiddleware = idValidation();
const validateSchemaMiddleware = schemaValidation(joiContactSchema);
const validateFavoriteMiddleware = schemaValidation(statusJoiSchema);

router.get('/', ctrl.getAll);

router.get('/:contactId', validateIdMiddleware, ctrl.getById);

router.post('/', validateSchemaMiddleware, ctrl.add);

router.delete('/:contactId', validateIdMiddleware, ctrl.removeById);

router.put(
  '/:contactId',
  validateIdMiddleware,
  validateSchemaMiddleware,
  ctrl.updateById
);

router.patch(
  '/:contactId/favorite',
  validateIdMiddleware,
  validateFavoriteMiddleware,
  ctrl.updateStatus
);

module.exports = router;
