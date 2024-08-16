const { Schema, model, Types } = require("mongoose");

const technologySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },

    version: {
      type: String,
      required: true,
    },
    firstContact: {
      type: Date,
      required: true,
    },
    knowledge: {
      type: String,
      enum: ["Overwhelmed", "Can Work With This", "I'm (still) lost"],
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Technology = model("Technology", technologySchema);

module.exports = Technology;
