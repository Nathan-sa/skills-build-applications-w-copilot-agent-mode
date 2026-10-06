import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
import { connectDatabase } from '../config/database.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const ids = {
      teams: [
        new mongoose.Types.ObjectId('650000000000000000000001'),
        new mongoose.Types.ObjectId('650000000000000000000002'),
      ],
      users: [
        new mongoose.Types.ObjectId('650000000000000000000011'),
        new mongoose.Types.ObjectId('650000000000000000000012'),
        new mongoose.Types.ObjectId('650000000000000000000013'),
      ],
      activities: [
        new mongoose.Types.ObjectId('650000000000000000000021'),
        new mongoose.Types.ObjectId('650000000000000000000022'),
        new mongoose.Types.ObjectId('650000000000000000000023'),
        new mongoose.Types.ObjectId('650000000000000000000024'),
      ],
      leaderboard: [
        new mongoose.Types.ObjectId('650000000000000000000031'),
        new mongoose.Types.ObjectId('650000000000000000000032'),
        new mongoose.Types.ObjectId('650000000000000000000033'),
      ],
      workouts: [
        new mongoose.Types.ObjectId('650000000000000000000041'),
        new mongoose.Types.ObjectId('650000000000000000000042'),
        new mongoose.Types.ObjectId('650000000000000000000043'),
      ],
    };

    await Promise.all([
      Team.deleteMany({ _id: { $in: ids.teams } }),
      User.deleteMany({ _id: { $in: ids.users } }),
      Activity.deleteMany({ _id: { $in: ids.activities } }),
      Leaderboard.deleteMany({ _id: { $in: ids.leaderboard } }),
      Workout.deleteMany({ _id: { $in: ids.workouts } }),
    ]);

    await Team.insertMany([
      {
        _id: ids.teams[0],
        name: 'Octocats',
        description: 'A friendly team building healthy habits together.',
        members: [ids.users[0], ids.users[1]],
      },
      {
        _id: ids.teams[1],
        name: 'Code Runners',
        description: 'Runners balancing miles with milestones.',
        members: [ids.users[2]],
      },
    ]);

    await User.insertMany([
      { _id: ids.users[0], name: 'Mona', email: 'mona@octofit.example', team: ids.teams[0] },
      { _id: ids.users[1], name: 'Luna', email: 'luna@octofit.example', team: ids.teams[0] },
      { _id: ids.users[2], name: 'Sam', email: 'sam@octofit.example', team: ids.teams[1] },
    ]);

    await Activity.insertMany([
      { _id: ids.activities[0], user: ids.users[0], type: 'Running', durationMinutes: 30, points: 150 },
      { _id: ids.activities[1], user: ids.users[1], type: 'Cycling', durationMinutes: 45, points: 180 },
      { _id: ids.activities[2], user: ids.users[2], type: 'Strength training', durationMinutes: 40, points: 160 },
      { _id: ids.activities[3], user: ids.users[0], type: 'Yoga', durationMinutes: 25, points: 100 },
    ]);

    await Leaderboard.insertMany([
      { _id: ids.leaderboard[0], user: ids.users[0], score: 250, period: 'current-week' },
      { _id: ids.leaderboard[1], user: ids.users[1], score: 180, period: 'current-week' },
      { _id: ids.leaderboard[2], user: ids.users[2], score: 160, period: 'current-week' },
    ]);

    await Workout.insertMany([
      {
        _id: ids.workouts[0],
        name: 'Beginner Cardio',
        description: 'An approachable session to build aerobic fitness.',
        difficulty: 'beginner',
        durationMinutes: 25,
        activities: ['Brisk walk', 'Easy jog', 'Cool-down'],
      },
      {
        _id: ids.workouts[1],
        name: 'Full-Body Strength',
        description: 'A balanced bodyweight strength session.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        activities: ['Squats', 'Push-ups', 'Lunges', 'Plank'],
      },
      {
        _id: ids.workouts[2],
        name: 'Mobility and Recovery',
        description: 'Gentle movement for rest and recovery days.',
        difficulty: 'beginner',
        durationMinutes: 20,
        activities: ['Hip mobility', 'Thoracic rotations', 'Hamstring stretch'],
      },
    ]);

    console.log('Seeded octofit_db with sample users, teams, activities, leaderboard entries, and workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

void seedDatabase();
