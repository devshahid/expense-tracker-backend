const Transactions = require('../models/transaction.schema');
const mongoose = require('mongoose');
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

const getTransaction = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.json({ message: 'transaction id missing' });
    return;
  }
  const result = await Transactions.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    { $unwind: '$userDetails' },
  ]);
  res.json({ result });
};

module.exports = { addTransactionHandler, getTransaction };
