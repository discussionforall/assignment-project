import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  publishYear: { type: String, required: true },
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
