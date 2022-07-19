import mongoose from "mongoose";
const URI = process.env.MONGO_URI || "";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(Error);
  }
};

export default connectDB;
