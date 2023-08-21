import { Schema, model, models } from "mongoose";

const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required!"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required!"],
  },
});

const Trip = models.Trip || model("Trip", TripSchema);

export default Trip;
