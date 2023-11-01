import { Schema, model } from "mongoose";
import { IIdea } from "../interfaces/IIdea";

const IdeaModel: Schema = new Schema<IIdea>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    reqired: true,
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
    default: {},
  },
});

export default model<IIdea>("IdeaModel", IdeaModel);