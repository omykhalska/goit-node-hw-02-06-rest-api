const { Contact } = require('../../models');

const add = async ({ body: contact }, res, next) => {
  try {
    const result = await Contact.create(contact);
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
