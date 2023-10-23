import { Document } from "mongoose";

interface IItem extends Document {
  name: string;
  description?: string;
}

export default IItem;