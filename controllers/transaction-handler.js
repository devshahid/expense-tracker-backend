const Transactions = require('../models/transaction.schema');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const schema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
  paymentMode: Joi.string().required(),
  isExpense: Joi.boolean().required(),
  date: Joi.date().iso().required(),
});

class TransactionHandler {
  async addTransactionHandler(req, res) {
    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        console.log(error);
        return res.json({ errorMessage: error.details });
      }
      const { name, amount, category, isExpense, description, date, paymentMode } = value;
      const { userId } = jwt.verify(req.session.userId, process.env.JWT_SECRET);
      const newTransaction = new Transactions({
        name,
        amount,
        type: category,
        via: isExpense ? 'Debit' : 'Credit',
        description,
        date,
        userId,
        paymentMode,
      });
      const result = await newTransaction.save();
      return res.status(201).json({ result });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  }

  async getTransaction(req, res) {
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
  }
}

module.exports = new TransactionHandler();
