import Contract from "../models/Contract.js";

export const createInitialContracts = async () => {
  try {
    const existingContract = await Contract.findOne({ name: "Contract 1" });

    if (!existingContract) {
      const newContract = new Contract({ name: "Contract 1" });
      await newContract.save();
      console.log("Contract created:", newContract);
    } else {
      console.log("Contract already exists:", existingContract);
    }
  } catch (error) {
    console.error("Failed to create contracts:", error);
  }
};
