import mongoose, { Schema } from "mongoose";
import IItem from "src/interfaces/IItem";

const itemSchema: Schema = new Schema<IItem>({
  name: { type: String, required: true },
  description: String,
});

export default mongoose.model<IItem>("Item", itemSchema);