import mongoose from "mongoose";
import "dotenv/config";

export const connecTotDb = async () => {
  await mongoose.connect(process.env.MONGODB).then(()=>console.log('DB CONNECTED')).catch(()=>console.log('SERVER Connection Error'));
};
