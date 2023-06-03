const Transactions = require('../models/transaction.schema');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const schema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().required(),
  via: Joi.string().required(),
});

const addTransactionHandler = async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.json({ errorMessage: error.details });
    }
    const { name, amount, type, via, description, date } = value;
    const { userId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const newTransaction = new Transactions({
      name,
      amount,
      type,
      via,
      description,
      date,
      userId,
    });
    const result = await newTransaction.save();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { addTransactionHandler };
