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

const StorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, trim: true, required: true, minlength: 1 },
  description: { type: String, trim: true, required: true, minlength: 1 },
  geometry: GeoSchema
});

const Story = mongoose.model("story", StorySchema);

module.exports = Story;
