import express from "express";
import connectDB from "./config/db.js";
import { createInitialContracts } from "./scripts/createInitialContract.js";
import trackRoutes from "./routes/track.routes.js";

const app = express();

app.use(express.json({ extended: false }));
app.use("/api", trackRoutes);

const startApp = async () => {
  try {
    await connectDB();
    await createInitialContracts();
    const PORT = process.env.PORT || 3000;
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== "test") {
  startApp();
}

export default app;
