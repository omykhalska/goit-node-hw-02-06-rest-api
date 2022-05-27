const { removeContact } = require('../../models/contacts');

const createError = require('http-errors');

const removeById = async ({ params: { contactId } }, res, next) => {
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
};

module.exports = removeById;
