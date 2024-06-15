import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  version: String,
  artist: {
    type: String,
    required: [true, "Artist is required"],
  },
  isrc: {
    type: String,
    required: [true, "ISRC is required"],
    unique: true,
  },
  pLine: String,
  aliases: [
    {
      type: String,
    },
  ],
  contractID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
    required: false,
  },
});

const Track = mongoose.model("Track", trackSchema);

export default Track;
