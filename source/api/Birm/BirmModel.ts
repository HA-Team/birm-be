import mongoose from "mongoose";

type TLocation = {
  type: string;
  coordinates: [number, number];
};

export interface IBirm extends mongoose.Document {
  _id: string;
  name: string;
  location: TLocation;
}

const birmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String },
    coordinates: [Number]
  }
});

birmSchema.index({ location: "2dsphere" });

const BirmModel = mongoose.model<IBirm>("Birm", birmSchema);

export default BirmModel;
