const { addContact } = require('../../models/contacts');

const add = async ({ body: contact }, res, next) => {
  try {
    const result = await addContact(contact);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
