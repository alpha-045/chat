import mongoose from "mongoose";

export const connectDB = async () => {
  const username = process.env.MONGO_INITDB_ROOT_USERNAME;
  const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
  const db = process.env.MONGO_DB_NAME;
  const Mport = process.env.MONGO_PORT;
  const HOST = process.env.HOST;

  // const uri = `mongodb://${username}:${password}@${HOST}:${Mport}/${db}?authSource=admin`; 


  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongoose connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("its error==>", err);
  }
};
