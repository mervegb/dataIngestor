import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Contract name is required"],
  },
});

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
