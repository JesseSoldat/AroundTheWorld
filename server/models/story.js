const mongoose = require("mongoose");
const { Schema } = mongoose;

const StorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, trim: true, required: true, minlength: 1 },
  description: { type: String, trim: true, required: true, minlength: 1 },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

const Story = mongoose.model("story", StorySchema);

module.exports = Story;
