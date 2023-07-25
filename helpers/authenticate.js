const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.json({ message: 'Token not available' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        return res.json({ message: 'User not authenticated' });
      }
      req.session.userId = result.userId;
      console.log(req.session.userId);
      next();
    });
  } catch (error) {
    res.json({ message: 'User not authenticated' });
  }
};
