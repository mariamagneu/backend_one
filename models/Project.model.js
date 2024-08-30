const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    website: {
      type: String,
      required: [true, "Website is required."],
      trim: true,
    },
    repos: {
      type: String,
      required: [true, "Website is required."],
      trim: true,
    },
    technology: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technology",
        required: [true, "Technology information is required."],
      },
    ],
    status: {
      type: String,
      enum: ["finished", "MVP", "stuck", "inProgress", "ideation"],
      required: [true, "Status is required."],
    },
    author: {
      type: String,
      enum: ["solo", "collaborative"],
      required: [true, "Status is required."],
    },
    collaborators: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;
