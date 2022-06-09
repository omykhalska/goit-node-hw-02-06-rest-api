const express = require('express');
const router = express.Router();

const { users: ctrl } = require('../../controllers');
const { schemaValidation, auth } = require('../../middlewares');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

const validateRegisterSchemaMiddleware = schemaValidation(joiRegisterSchema);
const validateLoginSchemaMiddleware = schemaValidation(joiLoginSchema);

router.post('/signup', validateRegisterSchemaMiddleware, ctrl.signup);

router.post('/login', validateLoginSchemaMiddleware, ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

module.exports = router;
