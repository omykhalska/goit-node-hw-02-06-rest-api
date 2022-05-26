const express = require('express');
const createError = require('http-errors');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error);
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async ({ params: { contactId } }, res, next) => {
  try {
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:contactId',
  async ({ params: { contactId }, body: contact }, res, next) => {
    try {
      const { error } = contactSchema.validate(contact);
      if (error) {
        throw createError(400, error);
      }
      const result = await updateContact(contactId, contact);
      if (!result) {
        throw createError(404, 'Not found');
      }
      res.status(200).json({
        status: 'success',
        code: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
