import mongoose from "mongoose";

const db = () => mongoose.connect("mongodb://localhost:27017/x");

export default db;
