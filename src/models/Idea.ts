import { Schema, model } from "mongoose";
import { IIdea } from "../interfaces/IIdea";

const IdeaModel: Schema = new Schema<IIdea>({
  email: {
    type: String,
    required: true,
  },
  idea: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  argumentation: {
    type: Object,
    required: false,
    default: {},
  },
});

export default model<IIdea>("IdeaModel", IdeaModel);