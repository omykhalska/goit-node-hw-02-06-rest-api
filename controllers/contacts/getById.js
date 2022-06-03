const { Contact } = require('../../models');
const createError = require('http-errors');

const getById = async ({ params: { contactId } }, res, next) => {
  try {
    const result = await Contact.findById(contactId);
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
};

module.exports = getById;
