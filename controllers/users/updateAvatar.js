const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file to upload' });
  }

  const { _id: id } = req.user;
  let file = req.file;
  const { path: tempUpload, originalname } = file;

  const avatarName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, avatarName);

  try {
    file = await Jimp.read(tempUpload);
    await file.resize(250, 250).quality(75);
    await file.writeAsync(resultUpload);

    const avatarURL = path.join('avatars', avatarName);

    await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

    res.status(200).json({ avatarURL });

    fs.unlink(tempUpload);
  } catch (error) {
    fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
