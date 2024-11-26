import mongoose from "mongoose";

export async function connectToDb() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ MongoDB Connected Successfully");
    });

    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1); // Gracefully exit the process on critical errors
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB");
    console.error(error.message);
    process.exit(1); // Exit with failure if there's a critical setup error
  }
}
