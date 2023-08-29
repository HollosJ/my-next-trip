import { Schema, model, models } from 'mongoose';

const ActivitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  notes: {
    type: String,
  },
});

const DateSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  activities: [ActivitySchema],
});

const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  location: {
    type: String,
    required: [true, 'Location is required!'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required!'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required!'],
  },
  itinerary: {
    type: [DateSchema],
  },
});

const Trip = models.Trip || model('Trip', TripSchema);

export default Trip;
