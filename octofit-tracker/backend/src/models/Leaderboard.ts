import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, score: -1 });

export default mongoose.models.Leaderboard ||
  mongoose.model('Leaderboard', leaderboardSchema);
