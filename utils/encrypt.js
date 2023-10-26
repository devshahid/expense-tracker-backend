const bcryptjs = require('bcryptjs');

const generateSalt = async (saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
};

const hashPassword = async (password, salt) => {
  return new Promise((resolve, reject) => {
    try {
      bcryptjs.hash(String(password), salt, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const encryptPassword = async (password) => {
  const salt = await generateSalt(10);
  return await hashPassword(password, salt);
};

const comparePassword = async (hasedPassword, match) => {
  return await bcryptjs.compare(match, hasedPassword);
};

module.exports = { encryptPassword, comparePassword };
