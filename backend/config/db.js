import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://shabarivignesh2004:database1@cluster0.afj25g5.mongodb.net/food-app"
    )
    .then(() => {
      console.log("db conneccted");
    });
};
