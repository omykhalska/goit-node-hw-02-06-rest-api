const { Contact } = require('../../models');

const createError = require('http-errors');

const updateById = async (
  { params: { contactId }, body: contact },
  res,
  next
) => {
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

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
