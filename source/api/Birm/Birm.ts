import MongoDataSource from "../MongoDataSource";
import BirmModel from "./BirmModel";

type TCoordinates = [number, number];

type TNewBirmData = {
  name: string;
  coordinates: TCoordinates;
};

export default class Birm extends MongoDataSource {
  name = "Birm";

  async getNearBirms(coordinates: TCoordinates) {
    try {
      const birms = await BirmModel.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates },
            $minDistance: 1,
            $maxDistance: 5000
          }
        }
      });

      return birms;
    } catch (err) {
      throw new Error(err);
    }
  }

  async addBirm(data: TNewBirmData) {
    try {
      const newBirm = await new BirmModel({
        name: data.name,
        location: {
          type: "Point",
          coordinates: data.coordinates
        }
      }).save();

      return newBirm;
    } catch (err) {
      throw new Error(err);
    }
  }
}
