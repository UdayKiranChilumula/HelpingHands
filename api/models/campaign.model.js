import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  donations:{type: Number,default:0},
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },  // New field for tracking raised amount
  category: { type: String, enum: ['Medical', 'Disaster Relief', 'Education', 'Charity', 'Others'], required: true },
  status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' },
  imageUrl: { type: String },
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
