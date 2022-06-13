const fs = require('fs/promises');
const { User } = require('../../models');
const path = require('path');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const avatarName = `${id}_${originalname}`;

    try {
      const resultUpload = path.join(avatarsDir, avatarName);
      await fs.rename(tempUpload, resultUpload);
      const avatarURL = path.join('avatars', avatarName);

      await User.findByIdAndUpdate(id, { avatarURL });

      res.status(200).json({ avatarURL });
    } catch (error) {
      fs.unlink(tempUpload);
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
