import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default mongoose.models.Team || mongoose.model('Team', teamSchema);
