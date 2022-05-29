const { Contact } = require('../../models');

const createError = require('http-errors');

const updateStatus = async (
  { params: { contactId }, body: { favorite } },
  res,
  next
) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

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

module.exports = updateStatus;
