import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};

export default connectDB;
