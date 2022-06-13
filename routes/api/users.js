const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { schemaValidation, auth } = require('../../middlewares');
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require('../../models/user');

const validateRegisterSchemaMiddleware = schemaValidation(joiRegisterSchema);
const validateLoginSchemaMiddleware = schemaValidation(joiLoginSchema);
const validateSubscriptionMiddleware = schemaValidation(joiSubscriptionSchema);

router.post('/signup', validateRegisterSchemaMiddleware, ctrl.signup);

router.post('/login', validateLoginSchemaMiddleware, ctrl.login);

router.get('/logout', auth, ctrl.logout);

router.get('/current', auth, ctrl.getCurrent);

router.patch(
  '/',
  auth,
  validateSubscriptionMiddleware,
  ctrl.updateSubscription
);

module.exports = router;
