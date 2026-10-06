import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    activities: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
