import mongoose from "mongoose";

const DebtorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amountOwed: { type: Number, required: true },
  debtDate: { type: Date, default: Date.now },
  isPaidOff: { type: Boolean, default: false },
});

export default mongoose.models.Debtor || mongoose.model("Debtor", DebtorSchema);
