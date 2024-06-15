import express from "express";
import connectDB from "./config/db.js";
import { createInitialContracts } from "./scripts/createInitialContract.js";
import trackRoutes from "./routes/track.routes.js";

const app = express();

const startApp = async () => {
  try {
    await connectDB();
    await createInitialContracts();
    app.use(express.json({ extended: false }));

    app.use("/api", trackRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
};

startApp();
