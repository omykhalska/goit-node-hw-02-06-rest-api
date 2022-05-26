const createError = require('http-errors');

const { updateContact } = require('../../models/contacts');

const updateById = async (
  { params: { contactId }, body: contact },
  res,
  next
) => {
  try {
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
};

module.exports = updateById;
