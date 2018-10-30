const mongoose = require("mongoose");
const { Schema } = mongoose;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

const StoryImageSchema = new Schema({
  path: String,
  downloadURL: String
});

const StorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, trim: true, required: true, minlength: 1 },
  description: {
    type: String,
    trim: true,
    default: "The user has not written a story for this place yet."
  },
  geometry: GeoSchema,
  images: { type: [StoryImageSchema] }
});

const Story = mongoose.model("story", StorySchema);

module.exports = Story;
