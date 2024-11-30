// models/DailyRecord.js
import mongoose from 'mongoose';

const DailyRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  stockItems: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  otherExpenses: {
    type: Map,
    of: Number,
    default: {},
  },
  stockTotal: {
    type: Number,
    required: true,
  },
  otherExpensesTotal: {
    type: Number,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
});

const DailyRecord = mongoose.models.DailyRecord || mongoose.model('DailyRecord', DailyRecordSchema);

export default DailyRecord;
