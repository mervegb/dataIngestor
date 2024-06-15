import express from "express";
import multer from "multer";
import { importTracks } from "../scripts/importData.js";
import Track from "../models/Track.js";
import Contract from "../models/Contract.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single("file"), async (request, response) => {
  if (!request.file) {
    return response.status(400).send("No file uploaded.");
  }
  try {
    await importTracks(request.file.buffer);
    response.status(200).send("Tracks imported successfully");
  } catch (error) {
    console.error("Failed to import tracks:", error);
    response.status(500).send("Failed to import tracks: " + error.message);
  }
});

router.get("/tracks", async (request, response) => {
  try {
    const tracks = await Track.find({});
    response.status(200).json(tracks);
  } catch (error) {
    console.error("Failed to retrieve tracks:", error);
    response
      .status(500)
      .json({ message: "Failed to retrieve tracks", error: error.message });
  }
});

router.get("/contract", async (request, response) => {
  try {
    const tracks = await Contract.find({});
    response.status(200).json(tracks);
  } catch (error) {
    console.error("Failed to retrieve tracks:", error);
    response
      .status(500)
      .json({ message: "Failed to retrieve tracks", error: error.message });
  }
});

router.delete("/track/:id", async (request, response) => {
  try {
    const track = await Track.findByIdAndDelete(request.params.id);

    if (!track) {
      return response.status(404).json({ message: "Track not found" });
    }

    response.status(200).json({
      message: "Track deleted successfully",
      trackId: request.params.id,
    });
  } catch (error) {
    console.error("Failed to delete track:", error);
    response
      .status(500)
      .json({ message: "Failed to delete track", error: error.message });
  }
});

export default router;
