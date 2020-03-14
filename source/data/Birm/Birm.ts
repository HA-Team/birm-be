import DataSource from "../DataSource";
import { Collection, MongoClient, ObjectId } from "mongodb";

type TCoordinates = [number, number];

type TNewBirmData = {
  name: string;
  coordinates: TCoordinates;
};

type TLocation = {
  type: string;
  coordinates: [number, number];
};

export type TBirm = {
  _id?: string | ObjectId;
  name: string;
  location: TLocation;
};

type TBirmsNearLocationInput = {
  coordinates: TCoordinates;
  maxDistance?: number;
};

export default class Birm extends DataSource {
  private birms: Collection<TBirm>;

  constructor(mongoClient: MongoClient) {
    super();

    this.birms = mongoClient.db("birm").collection("birms");

    // Method bindings
    this.getNearBirms = this.getNearBirms.bind(this);
    this.addBirm = this.addBirm.bind(this);
  }

  async getNearBirms({
    coordinates,
    maxDistance = 50000
  }: TBirmsNearLocationInput) {
    try {
      const birms = await this.birms
        .find({
          location: {
            $near: {
              $geometry: { type: "Point", coordinates },
              $maxDistance: maxDistance
            }
          }
        })
        .toArray();

      return birms;
    } catch (err) {
      throw new Error(err);
    }
  }

  async addBirm(data: TNewBirmData) {
    try {
      const newBirm = await this.birms.insertOne({
        name: data.name,
        location: {
          type: "Point",
          coordinates: data.coordinates
        }
      });

      return newBirm;
    } catch (err) {
      throw new Error(err);
    }
  }
}
