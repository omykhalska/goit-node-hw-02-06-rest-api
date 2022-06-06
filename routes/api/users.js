const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { schemaValidation } = require('../../middlewares');
const { joiRegisterSchema } = require('../../models/user');

const validateSchemaMiddleware = schemaValidation(joiRegisterSchema);

router.post('/signup', validateSchemaMiddleware, ctrl.signup);

module.exports = router;
