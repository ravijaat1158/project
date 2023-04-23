import mongoose, { mongo } from "mongoose";

const dataSchema = await mongoose.Schema({
  end_year: { type: String },
  intensity: { type: Number },
  sector: { type: String },
  topic: { type: String },
  insight: { type: String },
  url: { type: String },
  region: { type: String },
  start_year: { type: String },
  impact: { type: String },
  added: { type: String },
  published: { type: String },
  country: { type: String },
  relevance: { type: Number },
  pestle: { type: String },
  source: { type: String },
  title: { type: String },
  likelihood: { type: Number },
});

const dataModel = new mongoose.model("data", dataSchema);

export default dataModel;
